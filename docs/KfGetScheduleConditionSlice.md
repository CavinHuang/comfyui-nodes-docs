# Documentation
- Class name: KfGetScheduleConditionSlice
- Category: RootCategory
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点旨在从给定的时间表中提取和处理指定时间间隔的条件数据。它通过将时间表分割成一系列时间片，评估每个时间片的条件，汇总结果以提供所指定时间跨度内条件的全面概述。

# Input types
## Required
- schedule
    - 时间表参数至关重要，因为它包含了随时间定义条件的结构化数据。它是主要的输入参数，决定了节点的运作和输出的质量。
    - Comfy dtype: SCHEDULE
    - Python dtype: dict
## Optional
- start
    - 开始参数指定了节点处理时间表的时间间隔的开始。它很重要，因为它设置了时间切片操作的起点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- step
    - 步长参数定义了每个时间片之间的间隔。它很重要，因为它影响了提取的条件数据的粒度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- n
    - n参数决定了时间表被划分成多少个时间片。它很关键，因为它决定了节点执行的单独评估次数。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- CONDITIONING
    - 输出提供了在指定时间间隔从时间表中提取的条件的详细和结构化表示。它很重要，因为它包含了节点操作的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: list

# Usage tips
- Infra type: CPU

# Source code
```
class KfGetScheduleConditionSlice:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('CONDITIONING',)

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'schedule': ('SCHEDULE', {}), 'start': ('FLOAT', {'default': 0}), 'step': ('FLOAT', {'default': 1}), 'n': ('INT', {'default': 24})}}

    def main(self, schedule, start, step, n):
        stop = start + n * step
        times = np.linspace(start=start, stop=stop, num=n, endpoint=True)
        conds = [evaluate_schedule_at_time(schedule, time)[0] for time in times]
        lerped_tokenized = [c[0] for c in conds]
        lerped_pooled = [c[1]['pooled_output'] for c in conds]
        lerped_tokenized_t = torch.cat(lerped_tokenized, dim=0)
        out_dict = deepcopy(conds[0][1])
        if isinstance(lerped_pooled[0], torch.Tensor) and isinstance(lerped_pooled[-1], torch.Tensor):
            out_dict['pooled_output'] = torch.cat(lerped_pooled, dim=0)
        return [[(lerped_tokenized_t, out_dict)]]
```