---
tags:
- BackgroundRemoval
- Image
---

# imageRemBG
## Documentation
- Class name: `ttN imageREMBG`
- Category: `ttN/image`
- Output node: `True`

The ttN_imageREMBG node is designed to remove the background from images, leveraging the capabilities of the REMBG library. It abstracts the complexity of background removal into a simple interface, allowing for easy integration into image processing pipelines.
## Input types
### Required
- **`image`**
    - The input image from which the background is to be removed. This is the primary input for the background removal process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`image_output`**
    - Specifies the mode of output for the processed image, including options such as 'Hide', 'Preview', 'Save', and 'Hide/Save', allowing for flexible handling of the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Enum['Hide', 'Preview', 'Save', 'Hide/Save']`
- **`save_prefix`**
    - A prefix for the filename when saving the processed image, providing a way to organize and identify output files easily.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with the background removed.
    - Python dtype: `Image`
- **`mask`**
    - Comfy dtype: `MASK`
    - A mask indicating the areas of the image where the background was removed.
    - Python dtype: `Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
    class ttN_imageREMBG:
        version = '1.0.0'
        def __init__(self):
            pass
        
        @classmethod
        def INPUT_TYPES(s):
            return {"required": { 
                    "image": ("IMAGE",),
                    "image_output": (["Hide", "Preview", "Save", "Hide/Save"],{"default": "Preview"}),
                    "save_prefix": ("STRING", {"default": "ComfyUI"}),
                    },
                    "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                               "ttNnodeVersion": ttN_imageREMBG.version},
                }
            

        RETURN_TYPES = ("IMAGE", "MASK")
        RETURN_NAMES = ("image", "mask")
        FUNCTION = "remove_background"
        CATEGORY = "ttN/image"
        OUTPUT_NODE = True

        def remove_background(self, image, image_output, save_prefix, prompt, extra_pnginfo, my_unique_id):
            image = remove(ttNsampler.tensor2pil(image))
            tensor = ttNsampler.pil2tensor(image)
            
            #Get alpha mask
            if image.getbands() != ("R", "G", "B", "A"):
                image = image.convert("RGBA")
            mask = None
            if "A" in image.getbands():
                mask = np.array(image.getchannel("A")).astype(np.float32) / 255.0
                mask = torch.from_numpy(mask)
                mask = 1. - mask
            else:
                mask = torch.zeros((64,64), dtype=torch.float32, device=sampler.device)

            if image_output == "Disabled":
                results = []
            else:
                ttN_save = ttNsave(my_unique_id, prompt, extra_pnginfo)
                results = ttN_save.images(tensor, save_prefix, image_output)

            if image_output in ("Hide", "Hide/Save"):
                return (tensor, mask)

            # Output image results to ui and node outputs
            return {"ui": {"images": results},
                    "result": (tensor, mask)}

```
