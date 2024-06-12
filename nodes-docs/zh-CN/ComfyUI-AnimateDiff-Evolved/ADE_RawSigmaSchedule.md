# Create Raw Sigma Schedule 🎭🅐🅓
## Documentation
- Class name: ADE_RawSigmaSchedule
- Category: Animate Diff 🎭🅐🅓/sample settings/sigma schedule
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在根据给定的beta计划生成一个sigma计划。它将beta计划转换为sigma计划，这对于控制扩散模型中的噪声水平至关重要，特别是在动画和图像合成的背景下。

## Input types
### Required
- raw_beta_schedule
    - 指定要转换为sigma计划的beta计划。此参数对于确定整个扩散过程中的噪声水平的进展和强度至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- linear_start
    - 定义用于sigma计划生成的线性插值的起点。它影响扩散过程中的初始噪声水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- linear_end
    - 设置sigma计划中线性插值的终点，影响扩散过程中的最终噪声水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampling
    - 确定sigma计划中使用的采样方法，影响噪声水平的插值和应用方式。类型“ModelSamplingType”应理解为实际选择的采样方法的占位符。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lcm_original_timesteps
    - 指定使用LCM采样时要考虑的原始时间步数，影响sigma计划的粒度。
    - Comfy dtype: INT
    - Python dtype: int
- lcm_zsnr
    - 一个布尔标志，指示是否对sigma计划应用零信噪比（zSNR）调整，增强计划与某些扩散过程的兼容性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

## Output types
- sigma_schedule
    - Comfy dtype: SIGMA_SCHEDULE
    - 生成的sigma计划，概述了扩散过程每一步要应用的具体噪声水平。
    - Python dtype: SigmaSchedule

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class RawSigmaScheduleNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "raw_beta_schedule": (BetaSchedules.RAW_BETA_SCHEDULE_LIST,),
                "linear_start": ("FLOAT", {"default": 0.00085, "min": 0.0, "max": 1.0, "step": 0.000001}),
                "linear_end": ("FLOAT", {"default": 0.012, "min": 0.0, "max": 1.0, "step": 0.000001}),
                #"cosine_s": ("FLOAT", {"default": 8e-3, "min": 0.0, "max": 1.0, "step": 0.000001}),
                "sampling": (ModelSamplingType._FULL_LIST,),
                "lcm_original_timesteps": ("INT", {"default": 50, "min": 1, "max": 1000}),
                "lcm_zsnr": ("BOOLEAN", {"default": False}),
            }
        }
    
    RETURN_TYPES = ("SIGMA_SCHEDULE",)
    CATEGORY = "Animate Diff 🎭🅐🅓/sample settings/sigma schedule"
    FUNCTION = "get_sigma_schedule"

    def get_sigma_schedule(self, raw_beta_schedule: str, linear_start: float, linear_end: float,# cosine_s: float,
                           sampling: str, lcm_original_timesteps: int, lcm_zsnr: bool):
        new_config = ModelSamplingConfig(beta_schedule=raw_beta_schedule, linear_start=linear_start, linear_end=linear_end)
        if sampling != ModelSamplingType.LCM:
            lcm_original_timesteps=None
            lcm_zsnr=False
        model_type = ModelSamplingType.from_alias(sampling)    
        new_model_sampling = BetaSchedules._to_model_sampling(alias=BetaSchedules.AUTOSELECT, model_type=model_type, config_override=new_config, original_timesteps=lcm_original_timesteps)
        if lcm_zsnr:
            SigmaSchedule.apply_zsnr(new_model_sampling=new_model_sampling)
        return (SigmaSchedule(model_sampling=new_model_sampling, model_type=model_type),)