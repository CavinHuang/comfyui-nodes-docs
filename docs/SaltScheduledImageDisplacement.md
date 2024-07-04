
# Documentation
- Class name: SaltScheduledImageDisplacement
- Category: SALT/Scheduling/Image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltScheduledImageDisplacement节点用于根据提供的振幅和角度调度表，对一批图像应用预定的位移效果。该节点利用优化的位移层进行图像变换，允许在序列中动态操作图像，根据预定义的调度表调整位移效果。这种方法实现了对图像的精细控制，能够创造出随时间或序列变化的动态视觉效果。

# Input types
## Required
- images
    - 需要进行位移处理的图像批次。这是定义将要经历位移变换的基础内容的关键输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- displacement_images
    - 用于确定批次中每张图像的位移方向和幅度的图像。这些图像在指导位移过程中起着关键作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- amplitude_schedule
    - 指定批次中每张图像位移幅度的调度表。它控制位移效果的强度。
    - Comfy dtype: LIST
    - Python dtype: Optional[List[float]]
- angle_schedule
    - 详细说明每张图像位移角度的调度表。这个参数决定了位移效果的方向。
    - Comfy dtype: LIST
    - Python dtype: Optional[List[float]]

# Output types
- images
    - 应用预定位移后的图像批次。这个输出展示了经过位移效果处理后的转换图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduledImageDisplacement:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "displacement_images": ("IMAGE",),
            },
            "optional": {
                "amplitude_schedule": ("LIST",),
                "angle_schedule": ("LIST",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)

    FUNCTION = "apply_displacement"
    CATEGORY = "SALT/Scheduling/Image"

    def apply_displacement(self, images, displacement_images, amplitude_schedule=None, angle_schedule=None):
        batch_size, height, width, _ = images.shape
        device = images.device

        # Initialize the optimized displacement layer
        displacement_layer = DisplacementLayer(device)

        displaced_images = []
        for i in range(batch_size):
            # Default amplitude and angle to 0 if their schedules are not provided or are too short
            amplitude_value = amplitude_schedule[i] if amplitude_schedule and i < len(amplitude_schedule) else 0
            angle_value = angle_schedule[i] if angle_schedule and i < len(angle_schedule) else 0

            amplitude = torch.tensor([amplitude_value], dtype=torch.float, device=device)
            angle = torch.tensor([angle_value], dtype=torch.float, device=device)
            
            image = images[i:i+1].to(device)
            displacement_image = displacement_images[i:i+1].to(device)
            
            # Use the displacement layer
            displaced_image = displacement_layer(image, displacement_image, amplitude, angle)
            displaced_images.append(displaced_image)

        # Combine the batch of displaced images
        displaced_images = torch.cat(displaced_images, dim=0)

        return (displaced_images,)

```
