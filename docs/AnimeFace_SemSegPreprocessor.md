
# Documentation
- Class name: AnimeFace_SemSegPreprocessor
- Category: ControlNet Preprocessors/Semantic Segmentation
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AnimeFace_SemSegPreprocessor节点专门用于预处理动漫人脸语义分割任务的图像。它利用专门的模型从背景中分割动漫人脸，根据提供的设置可选择性地移除背景，并为进一步处理准备图像和蒙版。

# Input types
## Required
- image
    - 待处理的输入图像，用于动漫人脸分割。这是分割任务的主要对象。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- remove_background_using_abg
    - 一个标志，用于确定在分割过程中是否应从图像中移除背景。这会影响输出的蒙版和分割后的图像。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- resolution
    - 处理前将输入图像调整到的分辨率。这确保了在不同图像尺寸下分割输出的一致性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 分割后的动漫人脸图像，根据输入标志可选择性地移除背景。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- ABG_CHARACTER_MASK (MASK)
    - 指示图像中动漫人脸分割区域的蒙版。用于进一步的图像处理或操作。
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
