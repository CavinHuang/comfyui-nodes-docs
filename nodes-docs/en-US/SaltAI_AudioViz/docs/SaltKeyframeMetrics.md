---
tags:
- AnimationScheduling
- Scheduling
---

# Schedule Metrics
## Documentation
- Class name: `SaltKeyframeMetrics`
- Category: `SALT/Scheduling/Util`
- Output node: `False`

The SaltKeyframeMetrics node is designed to compute and present various metrics for keyframe values within a given schedule. It focuses on analyzing the statistical properties of keyframe sequences, such as maximum, minimum, sum, average, absolute sum, and absolute average values, along with the duration of the sequence. This node aids in evaluating the dynamic range and overall characteristics of keyframe data, useful for optimizing and understanding animation or audio-visual synchronization schedules.
## Input types
### Required
- **`schedule_list`**
    - The 'schedule_list' parameter represents the sequence of keyframe values to be analyzed. It is crucial for determining the statistical metrics that will be calculated, affecting the node's execution and results.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
### Optional
- **`start_frame`**
    - Specifies the starting frame index from which to begin analysis within the 'schedule_list'. It influences the subset of keyframes considered for metric calculation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_frame`**
    - Defines the ending frame index for the analysis within the 'schedule_list'. It determines the range of keyframes to be included in the metric calculations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_rate`**
    - The frame rate parameter is used to calculate the duration of the keyframe sequence. It affects the temporal aspect of the metrics, providing context to the statistical values in terms of time.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`value_min`**
    - Comfy dtype: `FLOAT`
    - Minimum value among the keyframe values analyzed.
    - Python dtype: `float`
- **`value_max`**
    - Comfy dtype: `FLOAT`
    - Maximum value among the keyframe values analyzed.
    - Python dtype: `float`
- **`value_sum`**
    - Comfy dtype: `FLOAT`
    - Sum of all keyframe values within the specified range.
    - Python dtype: `float`
- **`value_avg`**
    - Comfy dtype: `FLOAT`
    - Average value of the keyframe values within the analyzed range.
    - Python dtype: `float`
- **`abs_sum`**
    - Comfy dtype: `FLOAT`
    - Sum of the absolute values of the keyframe values, highlighting the overall activity regardless of direction.
    - Python dtype: `float`
- **`abs_avg`**
    - Comfy dtype: `FLOAT`
    - Average of the absolute values of the keyframe values, providing insight into the general magnitude of activity.
    - Python dtype: `float`
- **`duration`**
    - Comfy dtype: `FLOAT`
    - The duration of the keyframe sequence, calculated based on the frame rate and the number of frames.
    - Python dtype: `float`
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
