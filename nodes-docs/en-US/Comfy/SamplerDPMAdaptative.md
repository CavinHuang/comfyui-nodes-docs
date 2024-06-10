---
tags:
- Sampling
---

# SamplerDPMAdaptative
## Documentation
- Class name: `SamplerDPMAdaptative`
- Category: `sampling/custom_sampling/samplers`
- Output node: `False`

This node is designed to adaptively select and configure a sampler for deep probabilistic modeling, optimizing the sampling process based on dynamic input parameters and conditions. It focuses on enhancing the efficiency and accuracy of sampling in complex models by adjusting its parameters in real-time.
## Input types
### Required
- **`order`**
    - Specifies the order of the differential equation solver used in the sampling process, affecting the precision and computational requirements of the sampler.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rtol`**
    - Defines the relative tolerance for the solver, controlling the error tolerance in the numerical integration for the sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`atol`**
    - Sets the absolute tolerance for the solver, determining the error tolerance in the numerical integration, independent of the solution's scale.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`h_init`**
    - Initial step size for the solver, influencing the starting point for the adaptive step size control.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pcoeff`**
    - Coefficient related to proportional control in the adaptive algorithm, adjusting the response based on the current error.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`icoeff`**
    - Integral coefficient for the adaptive algorithm, modifying the response based on the accumulated error over time.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`dcoeff`**
    - Derivative coefficient in the adaptive algorithm, affecting the response to the rate of error change.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`accept_safety`**
    - Safety factor for accepting step sizes in the adaptive algorithm, ensuring stability and accuracy of the sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`eta`**
    - Controls the level of noise in the sampling process, influencing the exploration of the model's probability distribution.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`s_noise`**
    - Specifies the scale of noise to be added during sampling, affecting the diversity of generated samples.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`sampler`**
    - Comfy dtype: `SAMPLER`
    - The configured sampler object, ready for use in sampling tasks within deep probabilistic models.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SamplerDPMAdaptative:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"order": ("INT", {"default": 3, "min": 2, "max": 3}),
                     "rtol": ("FLOAT", {"default": 0.05, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "atol": ("FLOAT", {"default": 0.0078, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "h_init": ("FLOAT", {"default": 0.05, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "pcoeff": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "icoeff": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "dcoeff": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "accept_safety": ("FLOAT", {"default": 0.81, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "eta": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "s_noise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                      }
               }
    RETURN_TYPES = ("SAMPLER",)
    CATEGORY = "sampling/custom_sampling/samplers"

    FUNCTION = "get_sampler"

    def get_sampler(self, order, rtol, atol, h_init, pcoeff, icoeff, dcoeff, accept_safety, eta, s_noise):
        sampler = comfy.samplers.ksampler("dpm_adaptive", {"order": order, "rtol": rtol, "atol": atol, "h_init": h_init, "pcoeff": pcoeff,
                                                              "icoeff": icoeff, "dcoeff": dcoeff, "accept_safety": accept_safety, "eta": eta,
                                                              "s_noise":s_noise })
        return (sampler, )

```
