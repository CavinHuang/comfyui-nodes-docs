---
tags:
- Image
- ImageSequence
---

# Loop Image Sequence
## Documentation
- Class name: `JWLoopImageSequence`
- Category: `jamesWalker55`
- Output node: `False`

The JWLoopImageSequence node is designed to adjust the number of frames in an image sequence to match a specified target frame count. It either truncates the sequence to the target length or repeats the sequence (or parts of it) to reach the desired length, ensuring the output sequence has exactly the number of frames specified.
## Input types
### Required
- **`images`**
    - The tensor representing the sequence of images to be processed. It's the primary input for adjusting the sequence length.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`target_frames`**
    - An integer specifying the desired number of frames in the output image sequence. This determines whether the input sequence will be truncated or extended.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - A tensor representing the adjusted image sequence with the specified number of frames.
    - Python dtype: `torch.Tensor`
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
