
# Documentation
- Class name: ImageScaleToMegapixels
- Category: Art Venture/Utils
- Output node: False

ImageScaleToMegapixels节点旨在调整图像大小，使其总像素数达到指定的百万像素数。无论是放大还是缩小，它都能利用各种放大方法来实现所需的图像质量和尺寸，确保最终图像在保持宽高比的同时符合指定的百万像素数。

# Input types
## Required
- images
    - 需要调整大小的输入图像。这个参数至关重要，因为它作为缩放操作的基础，决定了实现目标百万像素大小时任何放大或缩小操作的起点。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- megapixels
    - 定义图像的目标大小（以百万像素为单位），指导缩放过程增加或减少图像尺寸以满足这一规格。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- upscale_model_opt
    - 可选择指定用于放大图像的放大模型，允许对缩放后的图像质量和外观进行高级定制。当需要将图像放大超过某个阈值时，这个参数会影响调整大小后图像的视觉效果。
    - Comfy dtype: UPSCALE_MODEL
    - Python dtype: str

# Output types
- image
    - 调整大小后的图像，已调整至符合指定的百万像素数。这个输出是缩放操作的直接结果，反映了尺寸的变化，并可能基于所选的放大方法体现质量的变化。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilImageScaleToTotalPixels(UtilImageScaleDownBy, ImageUpscaleWithModel):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "megapixels": ("FLOAT", {"default": 1, "min": 0.1, "max": 100, "step": 0.05}),
            },
            "optional": {
                "upscale_model_opt": ("UPSCALE_MODEL",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "image_scale_down_to_total_pixels"

    def image_scale_up_by(self, images: torch.Tensor, scale_by, upscale_model_opt):
        width = round(images.shape[2] * scale_by)
        height = round(images.shape[1] * scale_by)

        if scale_by < 1.2 or upscale_model_opt is None:
            s = images.movedim(-1, 1)
            s = comfy.utils.common_upscale(s, width, height, "bicubic", "disabled")
            s = s.movedim(1, -1)
            return (s,)
        else:
            s = self.upscale(upscale_model_opt, images)[0]
            return self.image_scale_down(s, width, height, "center")

    def image_scale_down_to_total_pixels(self, images, megapixels, upscale_model_opt=None):
        width = images.shape[2]
        height = images.shape[1]
        scale_by = np.sqrt((megapixels * 1024 * 1024) / (width * height))

        if scale_by <= 1.0:
            return self.image_scale_down_by(images, scale_by)
        else:
            return self.image_scale_up_by(images, scale_by, upscale_model_opt)

```
