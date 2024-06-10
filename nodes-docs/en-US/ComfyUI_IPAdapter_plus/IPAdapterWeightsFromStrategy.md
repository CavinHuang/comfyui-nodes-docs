---
tags:
- ControlNet
- Weight
---

# IPAdapter Weights From Strategy
## Documentation
- Class name: `IPAdapterWeightsFromStrategy`
- Category: `ipadapter/weights`
- Output node: `False`

The IPAdapterWeightsFromStrategy node is designed to generate weights for image processing based on a specified strategy. It allows for the dynamic adjustment of image processing parameters, facilitating tailored image manipulation according to the strategy chosen.
## Input types
### Required
- **`weights_strategy`**
    - Specifies the strategy to be used for generating weights, influencing how images are processed and manipulated.
    - Comfy dtype: `WEIGHTS_STRATEGY`
    - Python dtype: `str`
### Optional
- **`image`**
    - An optional image input that can be used in conjunction with the weights strategy to further customize the image processing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
## Output types
- **`weights`**
    - Comfy dtype: `FLOAT`
    - The generated weights based on the specified strategy.
    - Python dtype: `List[float]`
- **`weights_invert`**
    - Comfy dtype: `FLOAT`
    - The inverted weights derived from the original weights, used for alternative processing effects.
    - Python dtype: `List[float]`
- **`total_frames`**
    - Comfy dtype: `INT`
    - The total number of frames calculated based on the weights strategy, affecting the duration of the image processing.
    - Python dtype: `int`
- **`image_1`**
    - Comfy dtype: `IMAGE`
    - The first image output, modified according to the weights and strategy applied.
    - Python dtype: `torch.Tensor`
- **`image_2`**
    - Comfy dtype: `IMAGE`
    - The second image output, modified in a different manner based on the weights and strategy for varied effects.
    - Python dtype: `torch.Tensor`
- **`weights_strategy`**
    - Comfy dtype: `WEIGHTS_STRATEGY`
    - The weights strategy used for processing, including all parameters and settings involved.
    - Python dtype: `Dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterWeightsFromStrategy(IPAdapterWeights):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "weights_strategy": ("WEIGHTS_STRATEGY",),
            }, "optional": {
                "image": ("IMAGE",),
            }
        }

```
