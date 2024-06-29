---
tags:
- SamplerScheduler
- Sampling
---

# KSampler Config (rgthree)
## Documentation
- Class name: `KSampler Config (rgthree)`
- Category: `rgthree`
- Output node: `False`

The KSampler Config node in the rgthree context is designed to configure the sampling process for image generation, particularly focusing on the steps involved, refinement options, and the selection of samplers and schedulers. It abstracts the complexity of configuring various parameters for the sampling process, making it easier for users to customize their image generation pipeline.
## Input types
### Required
- **`steps_total`**
    - Specifies the total number of steps for the sampling process, allowing users to control the depth of the generation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`refiner_step`**
    - Determines the step at which refinement should begin, enabling finer control over the image refinement process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the conditioning factor, influencing the guidance and quality of the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampler to be used in the generation process, offering flexibility in choosing the sampling strategy.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduler for controlling the sampling process, allowing for different pacing and progression strategies.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`STEPS`**
    - Comfy dtype: `INT`
    - The total number of steps configured for the sampling process.
    - Python dtype: `int`
- **`REFINER_STEP`**
    - Comfy dtype: `INT`
    - The configured step at which refinement begins in the sampling process.
    - Python dtype: `int`
- **`CFG`**
    - Comfy dtype: `FLOAT`
    - The conditioning factor set for guiding the image generation.
    - Python dtype: `float`
- **`SAMPLER`**
    - Comfy dtype: `COMBO[STRING]`
    - The name of the sampler selected for the generation process.
    - Python dtype: `str`
- **`SCHEDULER`**
    - Comfy dtype: `COMBO[STRING]`
    - The scheduler chosen to control the progression of the sampling process.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeKSamplerConfig:
  """Some basic config stuff I started using for SDXL, but useful in other spots too."""

  NAME = get_name('KSampler Config')
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {
        "steps_total": ("INT", {
          "default": 30,
          "min": 1,
          "max": MAX_RESOLUTION,
          "step": 1,
        }),
        "refiner_step": ("INT", {
          "default": 24,
          "min": 1,
          "max": MAX_RESOLUTION,
          "step": 1,
        }),
        "cfg": ("FLOAT", {
          "default": 8.0,
          "min": 0.0,
          "max": 100.0,
          "step": 0.5,
        }),
        "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
        "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
        #"refiner_ascore_pos": ("FLOAT", {"default": 6.0, "min": 0.0, "max": 1000.0, "step": 0.01}),
        #"refiner_ascore_neg": ("FLOAT", {"default": 6.0, "min": 0.0, "max": 1000.0, "step": 0.01}),
      },
    }

  RETURN_TYPES = ("INT", "INT", "FLOAT", comfy.samplers.KSampler.SAMPLERS,
                  comfy.samplers.KSampler.SCHEDULERS)
  RETURN_NAMES = ("STEPS", "REFINER_STEP", "CFG", "SAMPLER", "SCHEDULER")
  FUNCTION = "main"

  def main(self, steps_total, refiner_step, cfg, sampler_name, scheduler):
    """main"""
    return (
      steps_total,
      refiner_step,
      cfg,
      sampler_name,
      scheduler,
    )

```
