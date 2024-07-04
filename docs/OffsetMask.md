
# Documentation
- Class name: OffsetMask
- Category: KJNodes/masking
- Output node: False

OffsetMask节点旨在通过应用指定的偏移量、旋转和复制因子来操纵和转换蒙版。它能够创建给定蒙版的多个变体，允许动态调整位置和方向，这在图像处理和增强任务中特别有用。

# Input types
## Required
- mask
    - 要进行转换的输入蒙版或蒙版批次。这个参数是节点操作的核心，作为所有后续转换的基础。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- x
    - 指定要应用于蒙版的水平偏移量。这个参数控制蒙版的横向位移。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - 指定要应用于蒙版的垂直偏移量。这个参数控制蒙版的纵向位移。
    - Comfy dtype: INT
    - Python dtype: int
- angle
    - 定义旋转蒙版的角度（以度为单位）。这个参数允许对蒙版进行旋转调整。
    - Comfy dtype: INT
    - Python dtype: int
- duplication_factor
    - 蒙版被复制以形成批次的次数。这个参数允许从单个输入创建多个蒙版变体。
    - Comfy dtype: INT
    - Python dtype: int
- roll
    - 确定在偏移过程中是否应用边缘包裹。这个布尔参数影响蒙版在其边界处的操作方式。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- incremental
    - 指示是否应该逐步应用偏移。这个布尔参数影响蒙版转换的方法。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- padding_mode
    - 指定在转换蒙版时要使用的填充模式。这个参数影响在偏移过程中如何处理蒙版的边缘。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- mask
    - 应用指定的偏移量、旋转和复制因子后的转换后的蒙版或蒙版批次。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class OffsetMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),
                "x": ("INT", { "default": 0, "min": -4096, "max": MAX_RESOLUTION, "step": 1, "display": "number" }),
                "y": ("INT", { "default": 0, "min": -4096, "max": MAX_RESOLUTION, "step": 1, "display": "number" }),
                "angle": ("INT", { "default": 0, "min": -360, "max": 360, "step": 1, "display": "number" }),
                "duplication_factor": ("INT", { "default": 1, "min": 1, "max": 1000, "step": 1, "display": "number" }),
                "roll": ("BOOLEAN", { "default": False }),
                "incremental": ("BOOLEAN", { "default": False }),
                "padding_mode": (
            [   
                'empty',
                'border',
                'reflection',
                
            ], {
               "default": 'empty'
            }),
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask",)
    FUNCTION = "offset"
    CATEGORY = "KJNodes/masking"
    DESCRIPTION = """
Offsets the mask by the specified amount.  
 - mask: Input mask or mask batch
 - x: Horizontal offset
 - y: Vertical offset
 - angle: Angle in degrees
 - roll: roll edge wrapping
 - duplication_factor: Number of times to duplicate the mask to form a batch
 - border padding_mode: Padding mode for the mask
"""

    def offset(self, mask, x, y, angle, roll=False, incremental=False, duplication_factor=1, padding_mode="empty"):
        # Create duplicates of the mask batch
        mask = mask.repeat(duplication_factor, 1, 1).clone()

        batch_size, height, width = mask.shape

        if angle != 0 and incremental:
            for i in range(batch_size):
                rotation_angle = angle * (i+1)
                mask[i] = TF.rotate(mask[i].unsqueeze(0), rotation_angle).squeeze(0)
        elif angle > 0:
            for i in range(batch_size):
                mask[i] = TF.rotate(mask[i].unsqueeze(0), angle).squeeze(0)

        if roll:
            if incremental:
                for i in range(batch_size):
                    shift_x = min(x*(i+1), width-1)
                    shift_y = min(y*(i+1), height-1)
                    if shift_x != 0:
                        mask[i] = torch.roll(mask[i], shifts=shift_x, dims=1)
                    if shift_y != 0:
                        mask[i] = torch.roll(mask[i], shifts=shift_y, dims=0)
            else:
                shift_x = min(x, width-1)
                shift_y = min(y, height-1)
                if shift_x != 0:
                    mask = torch.roll(mask, shifts=shift_x, dims=2)
                if shift_y != 0:
                    mask = torch.roll(mask, shifts=shift_y, dims=1)
        else:
            
            for i in range(batch_size):
                if incremental:
                    temp_x = min(x * (i+1), width-1)
                    temp_y = min(y * (i+1), height-1)
                else:
                    temp_x = min(x, width-1)
                    temp_y = min(y, height-1)
                if temp_x > 0:
                    if padding_mode == 'empty':
                        mask[i] = torch.cat([torch.zeros((height, temp_x)), mask[i, :, :-temp_x]], dim=1)
                    elif padding_mode in ['replicate', 'reflect']:
                        mask[i] = F.pad(mask[i, :, :-temp_x], (0, temp_x), mode=padding_mode)
                elif temp_x < 0:
                    if padding_mode == 'empty':
                        mask[i] = torch.cat([mask[i, :, :temp_x], torch.zeros((height, -temp_x))], dim=1)
                    elif padding_mode in ['replicate', 'reflect']:
                        mask[i] = F.pad(mask[i, :, -temp_x:], (temp_x, 0), mode=padding_mode)

                if temp_y > 0:
                    if padding_mode == 'empty':
                        mask[i] = torch.cat([torch.zeros((temp_y, width)), mask[i, :-temp_y, :]], dim=0)
                    elif padding_mode in ['replicate', 'reflect']:
                        mask[i] = F.pad(mask[i, :-temp_y, :], (0, temp_y), mode=padding_mode)
                elif temp_y < 0:
                    if padding_mode == 'empty':
                        mask[i] = torch.cat([mask[i, :temp_y, :], torch.zeros((-temp_y, width))], dim=0)
                    elif padding_mode in ['replicate', 'reflect']:
                        mask[i] = F.pad(mask[i, -temp_y:, :], (temp_y, 0), mode=padding_mode)
           
        return mask,

```
