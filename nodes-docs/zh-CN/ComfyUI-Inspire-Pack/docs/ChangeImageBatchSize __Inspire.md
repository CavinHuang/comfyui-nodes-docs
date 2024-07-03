
# Documentation
- Class name: ChangeImageBatchSize __Inspire
- Category: InspirePack/Util
- Output node: False

ChangeImageBatchSize节点旨在将图像张量的批次大小调整为指定大小，通过简单模式来扩展或裁剪批次以达到所需数量。这一功能对于确保图像数据在各种图像处理和生成任务中正确格式化以进行批处理至关重要。

# Input types
## Required
- image
    - 需要调整大小的图像张量。对于需要调整批次大小以满足特定要求的批处理来说，这是至关重要的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- batch_size
    - 指定图像张量的目标批次大小，决定张量将如何调整大小。
    - Comfy dtype: INT
    - Python dtype: int
- mode
    - 定义调整大小的模式，目前支持用于扩展或裁剪张量的"简单"方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 批次大小已调整的图像张量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ChangeImageBatchSize:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "image": ("IMAGE",),
                                "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096, "step": 1}),
                                "mode": (["simple"],)
                            }
                }

    CATEGORY = "InspirePack/Util"

    RETURN_TYPES = ("IMAGE", )
    FUNCTION = "doit"

    @staticmethod
    def resize_tensor(input_tensor, batch_size, mode):
        if mode == "simple":
            if len(input_tensor) < batch_size:
                last_frame = input_tensor[-1].unsqueeze(0).expand(batch_size - len(input_tensor), -1, -1, -1)
                output_tensor = torch.concat((input_tensor, last_frame), dim=0)
            else:
                output_tensor = input_tensor[:batch_size, :, :, :]
            return output_tensor
        else:
            print(f"[WARN] ChangeImage(Latent)BatchSize: Unknown mode `{mode}` - ignored")
            return input_tensor

    @staticmethod
    def doit(image, batch_size, mode):
        res = ChangeImageBatchSize.resize_tensor(image, batch_size, mode)
        return (res,)

```
