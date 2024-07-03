
# Documentation
- Class name: OffsetLatentImage
- Category: latent
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

OffsetLatentImage节点旨在通过对每个通道应用指定的偏移量来操作图像的潜在空间表示。这种操作允许在低层次上调整和微调生成图像的特征，提供了一种探索图像生成过程变化的方法。

# Input types
## Required
- width
    - 指定要生成的潜在图像的宽度。这个参数直接影响输出潜在表示的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 确定潜在图像的高度。与宽度类似，它影响潜在输出的大小，使得可以控制生成图像的纵横比。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 控制在单个批次中要生成的潜在图像数量，便于批处理以提高效率。
    - Comfy dtype: INT
    - Python dtype: int
- offset_i
    - 对潜在表示的第i个通道应用特定的偏移，从而改变其特征。索引i的范围是0到3，允许对潜在空间中的每个通道进行详细的自定义。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - 返回应用了偏移量的图像修改后的潜在表示，可以进行进一步处理或图像生成。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class OffsetLatentImage:
    def __init__(self):
        self.device = comfy.model_management.intermediate_device()

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "width": ("INT", {"default": 512, "min": 16, "max": MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 512, "min": 16, "max": MAX_RESOLUTION, "step": 8}),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096}),
                              "offset_0": ("FLOAT", {"default": 0.0, "min": -10.0, "max": 10.0, "step": 0.1,  "round": 0.1}),
                              "offset_1": ("FLOAT", {"default": 0.0, "min": -10.0, "max": 10.0, "step": 0.1,  "round": 0.1}),
                              "offset_2": ("FLOAT", {"default": 0.0, "min": -10.0, "max": 10.0, "step": 0.1,  "round": 0.1}),
                              "offset_3": ("FLOAT", {"default": 0.0, "min": -10.0, "max": 10.0, "step": 0.1,  "round": 0.1}),
                              }}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "generate"

    CATEGORY = "latent"

    def generate(self, width, height, batch_size, offset_0, offset_1, offset_2, offset_3):
        latent = torch.zeros([batch_size, 4, height // 8, width // 8], device=self.device)
        latent[:,0,:,:] = offset_0
        latent[:,1,:,:] = offset_1
        latent[:,2,:,:] = offset_2
        latent[:,3,:,:] = offset_3
        return ({"samples":latent}, )

```
