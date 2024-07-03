
# Documentation
- Class name: SaltKeyframeMetrics
- Category: SALT/Scheduling/Util
- Output node: False

SaltKeyframeMetrics节点旨在计算和呈现给定调度中关键帧值的各种指标。它专注于分析关键帧序列的统计特性，如最大值、最小值、总和、平均值、绝对总和和绝对平均值，以及序列的持续时间。该节点有助于评估关键帧数据的动态范围和整体特征，对于优化和理解动画或音视频同步调度非常有用。

# Input types
## Required
- schedule_list
    - 'schedule_list'参数表示要分析的关键帧值序列。它对于确定将要计算的统计指标至关重要，影响节点的执行和结果。
    - Comfy dtype: LIST
    - Python dtype: List[float]

## Optional
- start_frame
    - 指定在'schedule_list'中开始分析的起始帧索引。它影响用于指标计算的关键帧子集。
    - Comfy dtype: INT
    - Python dtype: int
- end_frame
    - 定义'schedule_list'中分析的结束帧索引。它决定了包含在指标计算中的关键帧范围。
    - Comfy dtype: INT
    - Python dtype: int
- frame_rate
    - 帧率参数用于计算关键帧序列的持续时间。它影响指标的时间方面，为统计值提供时间上下文。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- value_min
    - Comfy dtype: FLOAT
    - 分析的关键帧值中的最小值。
    - Python dtype: float
- value_max
    - Comfy dtype: FLOAT
    - 分析的关键帧值中的最大值。
    - Python dtype: float
- value_sum
    - Comfy dtype: FLOAT
    - 指定范围内所有关键帧值的总和。
    - Python dtype: float
- value_avg
    - Comfy dtype: FLOAT
    - 分析范围内关键帧值的平均值。
    - Python dtype: float
- abs_sum
    - Comfy dtype: FLOAT
    - 关键帧值绝对值的总和，突出显示整体活动，无论方向如何。
    - Python dtype: float
- abs_avg
    - Comfy dtype: FLOAT
    - 关键帧值绝对值的平均值，提供对一般活动幅度的洞察。
    - Python dtype: float
- duration
    - Comfy dtype: FLOAT
    - 关键帧序列的持续时间，根据帧率和帧数计算。
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltKeyframeMetrics:
    @classmethod
    def INPUT_TYPES(cls):
        input_types = {
            "required": {
                "schedule_list": ("LIST",),
            },
            "optional": {
                "start_frame": ("INT", {"min": 0, "default": 0}),
                "end_frame": ("INT", {"min": 0, "default": -1}),
                "frame_rate": ("FLOAT", {"min": 0.1, "default": 24.0}),
            }
        }
        return input_types

    RETURN_TYPES = ("FLOAT", "FLOAT", "FLOAT", "FLOAT", "FLOAT", "FLOAT", "FLOAT")
    RETURN_NAMES = ("value_min", "value_max", "value_sum", "value_avg", "abs_sum", "abs_avg", "duration")

    FUNCTION = "schedule_metrics"
    CATEGORY = "SALT/Scheduling/Util"

    def schedule_metrics(self, schedule_list, start_frame=0, end_frame=-1, frame_rate=24.0):
        if end_frame == -1 or end_frame > len(schedule_list):
            end_frame = len(schedule_list)

        num_frames = max(2, end_frame - start_frame)
        keyframe_values = schedule_list[start_frame:end_frame]

        value_min = float(np.min(keyframe_values).round(2))
        value_max = float(np.max(keyframe_values).round(2))
        value_sum = float(np.sum(keyframe_values).round(2))
        value_avg = float(np.mean(keyframe_values).round(2))
        abs_sum = float(np.sum(np.abs(keyframe_values)).round(2))
        abs_avg = float(np.mean(np.abs(keyframe_values)).round(2))
        duration = num_frames / frame_rate

        return value_min, value_max, value_sum, value_avg, abs_sum, abs_avg, duration
    
    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

```
