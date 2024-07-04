
# Documentation
- Class name: Inference_Core_AnimeFace_SemSegPreprocessor
- Category: ControlNet Preprocessors/Semantic Segmentation
- Output node: False

这个节点专门用于对图像进行语义分割预处理，特别关注动漫人脸。它利用深度学习模型从背景中分割出动漫人脸，并可以根据用户的偏好选择性地移除背景。该节点旨在通过提供更干净、更聚焦的输入来提高下游任务的性能。

# Input types
## Required
- image
    - 需要进行动漫人脸分割处理的输入图像。这张图像是语义分割的主要对象，目的是将动漫人脸从背景中分离出来。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- remove_background_using_abg
    - 一个布尔标志，用于决定是否从输入图像中移除背景，以增强对动漫人脸的关注。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- resolution
    - 指定处理输入图像的分辨率，影响输出分割的质量和大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 处理后的图像，动漫人脸已被分割，根据输入标志可选择性地移除背景。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- ABG_CHARACTER_MASK (MASK)
    - 一个掩码，指示图像中动漫人脸的分割区域，对进一步处理或分析很有用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


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
