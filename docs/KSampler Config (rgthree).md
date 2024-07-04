
# Documentation
- Class name: KSampler Config (rgthree)
- Category: rgthree
- Output node: False

KSampler Config节点是rgthree框架中的一个组件，专门用于配置图像生成过程中的采样参数。它主要关注采样步骤、细化选项以及采样器和调度器的选择。该节点通过抽象化采样过程中各种参数的复杂配置，使用户能够更轻松地定制他们的图像生成流程。

# Input types
## Required
- steps_total
    - 指定采样过程的总步骤数，允许用户控制生成过程的深度。
    - Comfy dtype: INT
    - Python dtype: int
- refiner_step
    - 确定开始细化的步骤，使用户能够更精细地控制图像细化过程。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 控制条件因子，影响生成图像的引导和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 选择生成过程中使用的特定采样器，为选择采样策略提供灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 选择控制采样过程的调度器，允许使用不同的节奏和进程策略。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- STEPS
    - 为采样过程配置的总步骤数。
    - Comfy dtype: INT
    - Python dtype: int
- REFINER_STEP
    - 在采样过程中配置的开始细化的步骤。
    - Comfy dtype: INT
    - Python dtype: int
- CFG
    - 为引导图像生成而设置的条件因子。
    - Comfy dtype: FLOAT
    - Python dtype: float
- SAMPLER
    - 为生成过程选择的采样器名称。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- SCHEDULER
    - 选择用于控制采样过程进程的调度器。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str


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
