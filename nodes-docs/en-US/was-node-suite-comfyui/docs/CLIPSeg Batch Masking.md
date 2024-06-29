---
tags:
- Segmentation
---

# CLIPSeg Batch Masking
## Documentation
- Class name: `CLIPSeg Batch Masking`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node applies the CLIPSeg model to a batch of images, generating corresponding segmentation masks based on the provided text descriptions. It leverages the CLIPSeg model's ability to understand the content of images in relation to textual descriptions, producing masks that highlight areas of interest specified by the text.
## Input types
### Required
- **`image_a`**
    - The first input image tensor to be segmented. It serves as the primary visual context for the segmentation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_b`**
    - The second input image tensor to be segmented. It acts as an additional visual context for the segmentation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`text_a`**
    - The first textual description that specifies the content to be segmented within the images. It guides the CLIPSeg model in focusing on relevant parts of the images for mask generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_b`**
    - The second textual description that specifies the content to be segmented within the images. It provides additional guidance to the CLIPSeg model for mask generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`image_c`**
    - An optional third input image tensor to be segmented, providing further visual context if available.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_d`**
    - An optional fourth input image tensor to be segmented, providing further visual context if available.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_e`**
    - An optional fifth input image tensor to be segmented, providing further visual context if available.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_f`**
    - An optional sixth input image tensor to be segmented, providing further visual context if available.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`text_c`**
    - An optional third textual description, offering additional content specification for segmentation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_d`**
    - An optional fourth textual description, offering additional content specification for segmentation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_e`**
    - An optional fifth textual description, offering additional content specification for segmentation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_f`**
    - An optional sixth textual description, offering additional content specification for segmentation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGES_BATCH`**
    - Comfy dtype: `IMAGE`
    - A batch of original images processed through the node.
    - Python dtype: `torch.Tensor`
- **`MASKS_BATCH`**
    - Comfy dtype: `MASK`
    - A batch of segmentation masks corresponding to the input images and text descriptions.
    - Python dtype: `torch.Tensor`
- **`MASK_IMAGES_BATCH`**
    - Comfy dtype: `IMAGE`
    - A batch of inverted mask images derived from the segmentation masks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_CLIPSeg_Batch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image_a": ("IMAGE",),
                "image_b": ("IMAGE",),
                "text_a": ("STRING", {"default":"", "multiline": False}),
                "text_b": ("STRING", {"default":"", "multiline": False}),
            },
            "optional": {
                "image_c": ("IMAGE",),
                "image_d": ("IMAGE",),
                "image_e": ("IMAGE",),
                "image_f": ("IMAGE",),
                "text_c": ("STRING", {"default":"", "multiline": False}),
                "text_d": ("STRING", {"default":"", "multiline": False}),
                "text_e": ("STRING", {"default":"", "multiline": False}),
                "text_f": ("STRING", {"default":"", "multiline": False}),
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK", "IMAGE")
    RETURN_NAMES = ("IMAGES_BATCH", "MASKS_BATCH", "MASK_IMAGES_BATCH")
    FUNCTION = "CLIPSeg_images"

    CATEGORY = "WAS Suite/Image/Masking"

    def CLIPSeg_images(self, image_a, image_b, text_a, text_b, image_c=None, image_d=None,
                       image_e=None, image_f=None, text_c=None, text_d=None, text_e=None, text_f=None):
        from transformers import CLIPSegProcessor, CLIPSegForImageSegmentation
        import torch.nn.functional as F

        images_pil = [tensor2pil(image_a), tensor2pil(image_b)]

        if image_c is not None:
            if image_c.shape[-2:] != image_a.shape[-2:]:
                cstr("Size of image_c is different from image_a.").error.print()
                return
            images_pil.append(tensor2pil(image_c))
        if image_d is not None:
            if image_d.shape[-2:] != image_a.shape[-2:]:
                cstr("Size of image_d is different from image_a.").error.print()
                return
            images_pil.append(tensor2pil(image_d))
        if image_e is not None:
            if image_e.shape[-2:] != image_a.shape[-2:]:
                cstr("Size of image_e is different from image_a.").error.print()
                return
            images_pil.append(tensor2pil(image_e))
        if image_f is not None:
            if image_f.shape[-2:] != image_a.shape[-2:]:
                cstr("Size of image_f is different from image_a.").error.print()
                return
            images_pil.append(tensor2pil(image_f))

        images_tensor = [torch.from_numpy(np.array(img.convert("RGB")).astype(np.float32) / 255.0).unsqueeze(0) for img in images_pil]
        images_tensor = torch.cat(images_tensor, dim=0)

        prompts = [text_a, text_b]
        if text_c:
            prompts.append(text_c)
        if text_d:
            prompts.append(text_d)
        if text_e:
            prompts.append(text_e)
        if text_f:
            prompts.append(text_f)

        cache = os.path.join(MODELS_DIR, 'clipseg')

        inputs = CLIPSegProcessor.from_pretrained("CIDAS/clipseg-rd64-refined", cache_dir=cache)
        model = CLIPSegForImageSegmentation.from_pretrained("CIDAS/clipseg-rd64-refined", cache_dir=cache)

        with torch.no_grad():
            result = model(**inputs(text=prompts, images=images_pil, padding=True, return_tensors="pt"))

        masks = []
        mask_images = []
        for i, res in enumerate(result.logits):
            tensor = torch.sigmoid(res)
            mask = 1. - (tensor - tensor.min()) / tensor.max()
            mask = mask.unsqueeze(0)
            mask = tensor2pil(mask).convert("L")
            mask = mask.resize(images_pil[0].size)
            mask_batch = pil2mask(mask)

            masks.append(mask_batch.unsqueeze(0).unsqueeze(1))
            mask_images.append(pil2tensor(ImageOps.invert(mask.convert("RGB"))).squeeze(0))

        masks_tensor = torch.cat(masks, dim=0)
        mask_images_tensor = torch.stack(mask_images, dim=0)

        del inputs, model, result, tensor, masks, mask_images, images_pil

        return (images_tensor, masks_tensor, mask_images_tensor)

```
