---
tags:
- SigmaScheduling
---

# FlipSigmasAdjusted
## Documentation
- Class name: `FlipSigmasAdjusted`
- Category: `KJNodes/noise`
- Output node: `False`

The FlipSigmasAdjusted node is designed to manipulate a sequence of sigma values for use in diffusion models. It inverts the order of the sigma values, applies an offset, and optionally scales the sequence based on the last sigma value or a specified divisor. This node is useful for adjusting the noise levels applied during the denoising steps of a generative model's sampling process.
## Input types
### Required
- **`sigmas`**
    - The sequence of sigma values to be adjusted. The inversion and adjustment operations are applied to this sequence.
    - Comfy dtype: `SIGMAS`
    - Python dtype: `torch.Tensor`
- **`divide_by_last_sigma`**
    - A boolean flag that determines whether the adjusted sigma values should be scaled by the last sigma value in the sequence.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`divide_by`**
    - A scalar value by which the adjusted sigma values are divided, providing a means to scale the sequence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`offset_by`**
    - An integer value indicating how much to offset the sigma values in the sequence, allowing for further adjustment.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`SIGMAS`**
    - Comfy dtype: `SIGMAS`
    - The adjusted sequence of sigma values after inversion, offsetting, and optional scaling.
    - Python dtype: `torch.Tensor`
- **`sigmas_string`**
    - Comfy dtype: `STRING`
    - A string representation of the adjusted sigma values, formatted for easy readability.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FlipSigmasAdjusted:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"sigmas": ("SIGMAS", ),
                     "divide_by_last_sigma": ("BOOLEAN", {"default": False}),
                     "divide_by": ("FLOAT", {"default": 1,"min": 1, "max": 255, "step": 0.01}),
                     "offset_by": ("INT", {"default": 1,"min": -100, "max": 100, "step": 1}),
                     }
                }
    RETURN_TYPES = ("SIGMAS", "STRING",)
    RETURN_NAMES = ("SIGMAS", "sigmas_string",)
    CATEGORY = "KJNodes/noise"
    FUNCTION = "get_sigmas_adjusted"

    def get_sigmas_adjusted(self, sigmas, divide_by_last_sigma, divide_by, offset_by):
        
        sigmas = sigmas.flip(0)
        if sigmas[0] == 0:
            sigmas[0] = 0.0001
        adjusted_sigmas = sigmas.clone()
        #offset sigma
        for i in range(1, len(sigmas)):
            offset_index = i - offset_by
            if 0 <= offset_index < len(sigmas):
                adjusted_sigmas[i] = sigmas[offset_index]
            else:
                adjusted_sigmas[i] = 0.0001 
        if adjusted_sigmas[0] == 0:
            adjusted_sigmas[0] = 0.0001  
        if divide_by_last_sigma:
            adjusted_sigmas = adjusted_sigmas / adjusted_sigmas[-1]

        sigma_np_array = adjusted_sigmas.numpy()
        array_string = np.array2string(sigma_np_array, precision=2, separator=', ', threshold=np.inf)
        adjusted_sigmas = adjusted_sigmas / divide_by
        return (adjusted_sigmas, array_string,)

```
