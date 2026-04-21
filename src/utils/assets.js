export const getImg = (name) => {
  return new URL(`../assets/img/${name}`, import.meta.url).href
}

export const getVideo = (name) => {
  return new URL(`../assets/video/${name}`, import.meta.url).href
}

export const get3dImg = (name) => {
  return new URL(`../assets/3d/images/${name}`, import.meta.url).href
}
export const getTiles = ()=>{
  return new URL(`/assets/3d/output/tileset.json`,import.meta.url).href
}

export const getModel = (name) => {
  if (Array.isArray(name)) {
    return name.map(item => new URL(`../assets/3d/model/${item}`, import.meta.url).href)
  } else {
    return new URL(`../assets/3d/model/${name}`, import.meta.url).href
  }
}

export const getHdr = (name) => {
  if (Array.isArray(name)) {
    return name.map(item => new URL(`../assets/3d/hdr/${item}`, import.meta.url).href)
  } else {
    return new URL(`../assets/3d/hdr/${name}`, import.meta.url).href
  }
}

export const getSky = (name) => {
  if (Array.isArray(name)) {
    return name.map(item => new URL(`../assets/3d/sky/${item}`, import.meta.url).href)
  } else {
    return new URL(`../assets/3d/sky/${name}`, import.meta.url).href
  }
}

export const getModelUrl = (jsonParser) => {
  return jsonParser.modelUrls.map((item, id) => {
    return {
      file: `./assets/3d/model/${item.file.split('/').pop()}`,
      id
    }
  })
}
