---
tags:
- Preview
---

# Preview Bridge (Image)
## Documentation
- Class name: `PreviewBridge`
- Category: `ImpactPack/Util`
- Output node: `True`

The PreviewBridge node serves as an intermediary for processing and caching images for preview purposes. It manages the refresh logic based on unique identifiers and cached states, loads images from cache or generates new previews as needed, and updates the cache with the new or existing image data.
## Input types
### Required
- **`images`**
    - A collection of images to be processed or cached for preview. This parameter is central to determining whether a refresh is needed based on the cache state.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`image`**
    - A single image to be either loaded from cache or to be used in generating a new preview. This parameter plays a key role in the refresh logic and subsequent processing.
    - Comfy dtype: `STRING`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed or cached image ready for preview. This output is crucial for accessing the updated or existing previews.
    - Python dtype: `List[Dict[str, Any]]`
- **`mask`**
    - Comfy dtype: `MASK`
    - The mask associated with the processed or cached image, indicating areas of interest or modification.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [SAMDetectorCombined](../../ComfyUI-Impact-Pack/Nodes/SAMDetectorCombined.md)
    - [DetailerForEachDebug](../../ComfyUI-Impact-Pack/Nodes/DetailerForEachDebug.md)
    - [BboxDetectorSEGS](../../ComfyUI-Impact-Pack/Nodes/BboxDetectorSEGS.md)



## Source code
```python
class PreviewBridge:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "images": ("IMAGE",),
                    "image": ("STRING", {"default": ""}),
                    },
                "hidden": {"unique_id": "UNIQUE_ID"},
                }

    RETURN_TYPES = ("IMAGE", "MASK", )

    FUNCTION = "doit"

    OUTPUT_NODE = True

    CATEGORY = "ImpactPack/Util"

    def __init__(self):
        super().__init__()
        self.output_dir = folder_paths.get_temp_directory()
        self.type = "temp"
        self.prev_hash = None

    @staticmethod
    def load_image(pb_id):
        is_fail = False
        if pb_id not in core.preview_bridge_image_id_map:
            is_fail = True

        image_path, ui_item = core.preview_bridge_image_id_map[pb_id]

        if not os.path.isfile(image_path):
            is_fail = True

        if not is_fail:
            i = Image.open(image_path)
            i = ImageOps.exif_transpose(i)
            image = i.convert("RGB")
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]

            if 'A' in i.getbands():
                mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
                mask = 1. - torch.from_numpy(mask)
            else:
                mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")
        else:
            image = empty_pil_tensor()
            mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")
            ui_item = {
                "filename": 'empty.png',
                "subfolder": '',
                "type": 'temp'
            }

        return image, mask.unsqueeze(0), ui_item

    def doit(self, images, image, unique_id):
        need_refresh = False

        if unique_id not in core.preview_bridge_cache:
            need_refresh = True

        elif core.preview_bridge_cache[unique_id][0] is not images:
            need_refresh = True

        if not need_refresh:
            pixels, mask, path_item = PreviewBridge.load_image(image)
            image = [path_item]
        else:
            res = nodes.PreviewImage().save_images(images, filename_prefix="PreviewBridge/PB-")
            image2 = res['ui']['images']
            pixels = images
            mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")

            path = os.path.join(folder_paths.get_temp_directory(), 'PreviewBridge', image2[0]['filename'])
            core.set_previewbridge_image(unique_id, path, image2[0])
            core.preview_bridge_image_id_map[image] = (path, image2[0])
            core.preview_bridge_image_name_map[unique_id, path] = (image, image2[0])
            core.preview_bridge_cache[unique_id] = (images, image2)

            image = image2

        return {
            "ui": {"images": image},
            "result": (pixels, mask, ),
        }

```
