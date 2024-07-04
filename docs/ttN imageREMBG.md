
# Documentation
- Class name: ttN imageREMBG
- Category: ttN/image
- Output node: True
- Repo Ref: https://github.com/ttN-dev/ComfyUI_tinyterraNodes

ttN_imageREMBG节点旨在从图像中移除背景，利用REMBG库的功能。它将背景移除的复杂性抽象为简单的接口，便于集成到图像处理流程中。

# Input types
## Required
- image
    - 需要移除背景的输入图像。这是背景移除过程的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: Image
- image_output
    - 指定处理后图像的输出模式，包括"Hide"、"Preview"、"Save"和"Hide/Save"等选项，允许灵活处理输出图像。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Enum['Hide', 'Preview', 'Save', 'Hide/Save']
- save_prefix
    - 保存处理后图像时的文件名前缀，提供了一种简单的方式来组织和识别输出文件。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 背景已被移除的处理后图像。
    - Comfy dtype: IMAGE
    - Python dtype: Image
- mask
    - 指示图像中背景被移除区域的蒙版。
    - Comfy dtype: MASK
    - Python dtype: Tensor


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
