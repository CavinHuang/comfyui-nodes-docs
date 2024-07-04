
# Documentation
- Class name: EmptyMotionData
- Category: MotionDiff
- Output node: False

EmptyMotionData节点旨在生成具有指定帧长的运动数据模板。它主要用于创建可进一步处理或操作的运动数据基础结构，为MotionDiff框架内的运动相关任务初始化提供标准化格式。

# Input types
## Required
- frames
    - 指定生成的运动数据的帧数。这个参数直接影响运动张量的形状，从而决定运动数据的时间长度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- motion_data
    - 输出一个包含运动、运动掩码和运动长度张量的字典，为运动数据建立一个基础结构，其中包含归零的运动值和适当的掩码。
    - Comfy dtype: MOTION_DATA
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class EmptyMotionData:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "frames": ("INT", {"default": 196, "min": 1, "max": 196})
            }
        }

    RETURN_TYPES = ("MOTION_DATA", )
    CATEGORY = "MotionDiff"
    FUNCTION = "encode_text"

    def encode_text(self, frames):
        return ({
            'motion': torch.zeros(1, frames, 263),
            'motion_mask': torch.ones(1, frames),
            'motion_length': torch.Tensor([frames]).long(),
        }, )

```
