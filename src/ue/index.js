import ue, { ue5 } from "./linkUE";
import { handleUeEvents } from "./handler";
import mitt from "mitt";
import { onBeforeUnmount } from "vue";
import { CACHE } from "@/ktJS/CACHE";

const emitter = mitt();

// 向UE发送消息
export const sendToUE = (type, data = {}) => {
  const params = {
    type,
    data,
  };
  console.log("WebToUE --web发送到UE数据-->", params);

  // 原有的 ue5 方式（通过 URL hash）
  ue5("WebToUE", params);

  // 新增：通过 Pixel Streaming 发送消息
  if (CACHE.pixelStream?.stream) {
    // 使用 Pixel Streaming 的 sendMessage 或 emitUIInteraction
    try {
      // 方法1：使用 emitUIInteraction（如果存在）
      if (typeof CACHE.pixelStream.stream.emitUIInteraction === "function") {
        CACHE.pixelStream.stream.emitUIInteraction(params);
      }

      // 方法2：使用 sendMessage（Pixel Streaming 标准方法）
      if (typeof CACHE.pixelStream.stream.sendMessage === "function") {
        CACHE.pixelStream.stream.sendMessage("WebToUE", params);
      }

      // 方法3：通过 UI 交互发送（Pixel Streaming 推荐方式）
      if (CACHE.pixelStream.stream._webRtcController?.dataChannelController) {
        CACHE.pixelStream.stream._webRtcController.dataChannelController.sendMessage(
          JSON.stringify(params),
        );
      }
    } catch (error) {
      console.warn("Pixel Streaming 发送消息失败:", error);
    }
  }

  if (window.loadMethod) {
    // 原有的其他方式
  }
};

// 提供给UE调用的接口（接收来自 UE 的消息）
ue.interface.UEemit = function (_params) {
  let params = _params;
  if (typeof _params === "string") params = JSON.parse(_params);
  const { type, data } = params;

  // 处理事件
  handleUeEvents(type, data);

  // 触发 mitt 事件，供组件监听
  emitter.emit(type, data);

  // 也可以触发自定义 DOM 事件
  window.dispatchEvent(new CustomEvent(`ue-${type}`, { detail: data }));
};

// 监听UE消息（组件中使用）
export const watchUEEvents = (events) => {
  for (const event in events) {
    console.log(event, "event");
    emitter.on(event, events[event]);
  }
  onBeforeUnmount(() => {
    for (const event in events) {
      emitter.off(event, events[event]);
    }
  });
};

// 新增：等待 Pixel Streaming 就绪
export const waitForPixelStreaming = () => {
  return new Promise((resolve) => {
    if (CACHE.pixelStream?.stream) {
      resolve(CACHE.pixelStream.stream);
    } else {
      window.addEventListener("ue-pixel-ready", () => {
        resolve(CACHE.pixelStream.stream);
      });
    }
  });
};

// 导出 emitter 供其他模块直接使用
export { emitter };
