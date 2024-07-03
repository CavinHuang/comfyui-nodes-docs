
# Documentation
- Class name: JWLoopImageSequence
- Category: jamesWalker55
- Output node: False

JWLoopImageSequence节点旨在调整图像序列中的帧数，使其匹配指定的目标帧数。它可以截断序列至目标长度，或者重复序列（或其部分）以达到所需长度，确保输出序列恰好具有指定数量的帧。

# Input types
## Required
- images
    - 表示要处理的图像序列的张量。这是用于调整序列长度的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- target_frames
    - 一个整数，指定输出图像序列中所需的帧数。这决定了输入序列是否会被截断或延长。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 表示经过调整的图像序列的张量，具有指定数量的帧。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWLoopImageSequence", "Loop Image Sequence")
class LoopImageSequence:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "images": ("IMAGE",),
            "target_frames": ("INT", {"default": 16, "step": 1}),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(self, images: torch.Tensor, target_frames: int):
        if len(images) > target_frames:
            images = images[0:target_frames]
        elif len(images) < target_frames:
            to_cat = []

            for _ in range(target_frames // len(images)):
                to_cat.append(images)

            extra_frames = target_frames % len(images)
            if extra_frames > 0:
                to_cat.append(images[0:extra_frames])

            images = torch.cat(to_cat, dim=0)
            assert len(images) == target_frames
        else:  # len(images) == target_frames
            pass

        return (images,)

```
