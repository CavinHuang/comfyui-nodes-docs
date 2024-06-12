---
tags:
- Segmentation
---

# CLIPSeg Masking
## Documentation
- Class name: `CLIPSeg Masking`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node leverages the CLIPSeg model for image segmentation, utilizing both textual and visual inputs to generate a segmentation mask. It's designed to understand and segment images based on textual descriptions, providing a flexible approach to image analysis that combines the capabilities of CLIP models with segmentation techniques.
## Input types
### Required
- **`image`**
    - The input image to be segmented. It serves as the visual context for the segmentation process, allowing the model to generate a mask that highlights areas of interest based on the accompanying text.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`text`**
    - An optional textual description that guides the segmentation process, enabling the model to focus on specific elements within the image as described by the text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`clipseg_model`**
    - An optional pre-loaded CLIPSeg model and processor. If provided, it bypasses the default model loading process, allowing for customization and potentially faster processing.
    - Comfy dtype: `CLIPSEG_MODEL`
    - Python dtype: `Tuple[CLIPSegProcessor, CLIPSegForImageSegmentation]`
## Output types
- **`MASK`**
    - Comfy dtype: `MASK`
    - The output is a segmentation mask that highlights areas of interest in the image as determined by the textual description and visual analysis.
    - Python dtype: `torch.Tensor`
- **`MASK_IMAGE`**
    - Comfy dtype: `IMAGE`
    - An inverted version of the segmentation mask, represented as an image, which can be used for further image processing or visualization.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImpactDilateMask](../../ComfyUI-Impact-Pack/Nodes/ImpactDilateMask.md)



## Source code
```python
class WAS_CLIPSeg:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "text": ("STRING", {"default":"", "multiline": False}),
            },
            "optional": {
                "clipseg_model": ("CLIPSEG_MODEL",),
            }
        }

    RETURN_TYPES = ("MASK", "IMAGE")
    RETURN_NAMES = ("MASK", "MASK_IMAGE")
    FUNCTION = "CLIPSeg_image"

    CATEGORY = "WAS Suite/Image/Masking"

    def CLIPSeg_image(self, image, text=None, clipseg_model=None):
        from transformers import CLIPSegProcessor, CLIPSegForImageSegmentation

        image = tensor2pil(image)
        cache = os.path.join(MODELS_DIR, 'clipseg')

        if clipseg_model:
            inputs = clipseg_model[0]
            model = clipseg_model[1]
        else:
            inputs = CLIPSegProcessor.from_pretrained("CIDAS/clipseg-rd64-refined", cache_dir=cache)
            model = CLIPSegForImageSegmentation.from_pretrained("CIDAS/clipseg-rd64-refined", cache_dir=cache)

        with torch.no_grad():
            result = model(**inputs(text=text, images=image, padding=True, return_tensors="pt"))

        tensor = torch.sigmoid(result[0])
        mask = 1. - (tensor - tensor.min()) / tensor.max()
        mask = mask.unsqueeze(0)
        mask = tensor2pil(mask).convert("L")
        mask = mask.resize(image.size)

        return (pil2mask(mask), pil2tensor(ImageOps.invert(mask.convert("RGB"))))

```
