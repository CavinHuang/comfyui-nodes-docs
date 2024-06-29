---
tags:
- Segmentation
- SemanticSegmentationPreprocessing
---

# Anime Face Segmentor
## Documentation
- Class name: `AnimeFace_SemSegPreprocessor`
- Category: `ControlNet Preprocessors/Semantic Segmentation`
- Output node: `False`

This node is designed for preprocessing images for semantic segmentation tasks specifically tailored to anime faces. It leverages a specialized model to segment anime faces from the background, optionally removing the background based on the provided settings, and prepares the image and mask for further processing.
## Input types
### Required
- **`image`**
    - The input image to be processed for anime face segmentation. This image is the primary subject for the segmentation task.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`remove_background_using_abg`**
    - A flag to determine whether the background should be removed from the image during the segmentation process. This affects the output mask and segmented image.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`resolution`**
    - The resolution to which the input image is resized before processing. This ensures consistency in the segmentation output across different image sizes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The segmented image with anime faces, optionally with the background removed based on the input flag.
    - Python dtype: `torch.Tensor`
- **`ABG_CHARACTER_MASK (MASK)`**
    - Comfy dtype: `MASK`
    - The mask indicating the segmented areas of the anime faces in the image. Useful for further image manipulation or processing.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AnimeFace_SemSegPreprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",)
            },
            "optional": {
                #This preprocessor is only trained on 512x resolution
                #https://github.com/siyeong0/Anime-Face-Segmentation/blob/main/predict.py#L25
                "remove_background_using_abg": ("BOOLEAN", {"default": True}),
                "resolution": ("INT", {"default": 512, "min": 512, "max": 512, "step": 64})
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    RETURN_NAMES = ("IMAGE", "ABG_CHARACTER_MASK (MASK)")
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Semantic Segmentation"

    def execute(self, image, remove_background_using_abg=True, resolution=512, **kwargs):
        from controlnet_aux.anime_face_segment import AnimeFaceSegmentor

        model = AnimeFaceSegmentor.from_pretrained().to(model_management.get_torch_device())
        if remove_background_using_abg:
            out_image_with_mask = common_annotator_call(model, image, resolution=resolution, remove_background=True)
            out_image = out_image_with_mask[..., :3]
            mask = out_image_with_mask[..., 3:]
            mask = rearrange(mask, "n h w c -> n c h w")
        else:
            out_image = common_annotator_call(model, image, resolution=resolution, remove_background=False)
            N, H, W, C = out_image.shape
            mask = torch.ones(N, C, H, W)
        del model
        return (out_image, mask)

```
