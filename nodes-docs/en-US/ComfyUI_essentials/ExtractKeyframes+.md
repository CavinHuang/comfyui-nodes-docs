---
tags:
- AnimationScheduling
- Frame
- Keyframe
---

# 🔧 Extract Keyframes (experimental)
## Documentation
- Class name: `ExtractKeyframes+`
- Category: `essentials`
- Output node: `False`

The ExtractKeyframes node is designed to identify and extract key frames from a sequence of images based on the variation in content between consecutive frames. It utilizes a threshold to determine significant changes, thereby isolating frames that represent substantial shifts in the visual narrative.
## Input types
### Required
- **`image`**
    - The sequence of images from which key frames are to be extracted. It serves as the primary input for analyzing variations between frames.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`threshold`**
    - A value that determines the sensitivity of variation detection between frames. A higher threshold results in fewer key frames being identified, focusing on more significant changes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`KEYFRAMES`**
    - Comfy dtype: `IMAGE`
    - The extracted key frames that represent significant changes in the sequence.
    - Python dtype: `torch.Tensor`
- **`indexes`**
    - Comfy dtype: `STRING`
    - The indices of the extracted key frames within the original sequence, provided as a comma-separated string.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ExtractKeyframes:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "threshold": ("FLOAT", { "default": 0.85, "min": 0.00, "max": 1.00, "step": 0.01, }),
            }
        }

    RETURN_TYPES = ("IMAGE", "STRING")
    RETURN_NAMES = ("KEYFRAMES", "indexes")

    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image, threshold):
        window_size = 2

        variations = torch.sum(torch.abs(image[1:] - image[:-1]), dim=[1, 2, 3])
        #variations = torch.sum((image[1:] - image[:-1]) ** 2, dim=[1, 2, 3])
        threshold = torch.quantile(variations.float(), threshold).item()

        keyframes = []
        for i in range(image.shape[0] - window_size + 1):
            window = image[i:i + window_size]
            variation = torch.sum(torch.abs(window[-1] - window[0])).item()

            if variation > threshold:
                keyframes.append(i + window_size - 1)

        return (image[keyframes], ','.join(map(str, keyframes)),)

```
