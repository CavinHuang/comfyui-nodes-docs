---
tags:
- Segmentation
- SemanticSegmentationPreprocessing
---

# [Inference.Core] Anime Face Segmentor
## Documentation
- Class name: `Inference_Core_AnimeFace_SemSegPreprocessor`
- Category: `ControlNet Preprocessors/Semantic Segmentation`
- Output node: `False`

This node specializes in preprocessing images for semantic segmentation, particularly focusing on anime faces. It leverages a deep learning model to segment anime faces from the background, optionally removing the background based on the user's preference. The node is designed to enhance the performance of downstream tasks by providing cleaner, more focused inputs.
## Input types
### Required
- **`image`**
    - The input image to be processed for anime face segmentation. This image is the primary subject for semantic segmentation, aiming to isolate anime faces from their backgrounds.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`remove_background_using_abg`**
    - A boolean flag that determines whether the background should be removed from the input image, enhancing focus on the anime face.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`resolution`**
    - Specifies the resolution to which the input image should be processed, affecting the quality and size of the output segmentation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The processed image with the anime face segmented, optionally with the background removed based on the input flag.
    - Python dtype: `torch.Tensor`
- **`ABG_CHARACTER_MASK (MASK)`**
    - Comfy dtype: `MASK`
    - A mask indicating the segmented areas of the anime face within the image, useful for further processing or analysis.
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
