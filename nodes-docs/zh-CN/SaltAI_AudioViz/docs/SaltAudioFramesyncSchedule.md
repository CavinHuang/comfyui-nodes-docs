
# Documentation
- Class name: SaltAudioFramesyncSchedule
- Category: SALT/Audio/Scheduling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltAudioFramesyncSchedule节点旨在通过基于音频分析来调度帧以实现音频与视觉元素的同步。它通过将关键帧与特定的音频提示对齐来促进音视频内容的创建，从而实现与音轨和谐一致的动态视觉效果。

# Input types
## Required
- audio
    - 用于生成帧同步调度的音频输入。它对于确定视觉效果相对于音频的时间和动态至关重要。
    - Comfy dtype: AUDIO
    - Python dtype: np.ndarray
- amp_control
    - 控制音频分析的振幅灵敏度，影响音频电平如何影响帧调度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- amp_offset
    - 振幅的偏移值，允许根据音频振幅对帧调度进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frame_rate
    - 视觉元素与音频同步的帧率，决定同步的时间精度。
    - Comfy dtype: INT
    - Python dtype: int
- start_frame
    - 同步调度的起始帧，使得能够在音视频内容的特定片段内进行有针对性的同步。
    - Comfy dtype: INT
    - Python dtype: int
- end_frame
    - 同步调度的结束帧，定义音视频同步的范围。
    - Comfy dtype: INT
    - Python dtype: int
- curves_mode
    - 指定用于振幅控制的缓动函数，影响视觉效果对音频的动态响应。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list

## Optional
- frequency_low
    - 音频分析考虑的频率范围的下限，影响影响帧调度的音频内容的选择。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frequency_high
    - 音频分析考虑的频率范围的上限，影响影响帧调度的音频内容的选择。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- left_low_schedule
    - Comfy dtype: LIST
    - 左声道低频范围的调度帧。
    - Python dtype: list
- left_mid_schedule
    - Comfy dtype: LIST
    - 左声道中频范围的调度帧。
    - Python dtype: list
- left_high_schedule
    - Comfy dtype: LIST
    - 左声道高频范围的调度帧。
    - Python dtype: list
- right_low_schedule
    - Comfy dtype: LIST
    - 右声道低频范围的调度帧。
    - Python dtype: list
- right_mid_schedule
    - Comfy dtype: LIST
    - 右声道中频范围的调度帧。
    - Python dtype: list
- right_high_schedule
    - Comfy dtype: LIST
    - 右声道高频范围的调度帧。
    - Python dtype: list
- average_low
    - Comfy dtype: LIST
    - 两个声道低频范围的平均帧调度。
    - Python dtype: list
- average_mid
    - Comfy dtype: LIST
    - 两个声道中频范围的平均帧调度。
    - Python dtype: list
- average_high
    - Comfy dtype: LIST
    - 两个声道高频范围的平均帧调度。
    - Python dtype: list
- average_schedule
    - Comfy dtype: LIST
    - 所有频率范围和声道的总体平均帧调度。
    - Python dtype: list
- frame_count
    - Comfy dtype: INT
    - 调度的总帧数。
    - Python dtype: int
- frame_rate
    - Comfy dtype: INT
    - 用于调度的帧率。
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioFramesyncSchedule:
    @classmethod
    def INPUT_TYPES(cls):
        easing_fns = list(easing_functions.keys())
        easing_fns.insert(0, "None")
        return {
            "required": {
                "audio": ("AUDIO", ),
                "amp_control": ("FLOAT", {"min": 0.1, "max": 1024.0, "default": 1.0, "step": 0.01}),
                "amp_offset": ("FLOAT", {"min": 0.0, "max": 1023.0, "default": 0.0, "step": 0.01}),
                "frame_rate": ("INT", {"min": 1, "max": 244, "default": 8}),
                "start_frame": ("INT", {"min": 0, "default": 0}), 
                "end_frame": ("INT", {"min": -1}),
                "curves_mode": (easing_fns, ),
            }, 
            "optional": {
                "frequency_low": ("FLOAT", {"min": 0, "max": 22050, "default": 250, "step": 0.01}),
                "frequency_high": ("FLOAT", {"min": 0, "max": 22050, "default": 4000, "step": 0.01})
            }
        } 

    RETURN_TYPES = ("LIST", "LIST", "LIST", "LIST", "LIST", "LIST", "LIST", "LIST", "LIST", "LIST", "INT", "INT")
    RETURN_NAMES = ("left_low_schedule", "left_mid_schedule", "left_high_schedule", "right_low_schedule", 
                    "right_mid_schedule", "right_high_schedule", "average_low", "average_mid", "average_high", 
                    "average_schedule", "frame_count", "frame_rate")
    
    FUNCTION = "schedule"
    CATEGORY = "SALT/Audio/Scheduling"

    def dbfs_floor_ceiling(self, audio_segment):
        min_dbfs = 0
        max_dbfs = -float('inf')
        for chunk in audio_segment[::1000]:
            if chunk.dBFS > max_dbfs:
                max_dbfs = chunk.dBFS
            if chunk.dBFS < min_dbfs and chunk.dBFS != -float('inf'):
                min_dbfs = chunk.dBFS
        return min_dbfs, max_dbfs

    def dbfs2loudness(self, dbfs, amp_control, amp_offset, dbfs_min, dbfs_max):
        if dbfs == -float('inf'):
            return amp_offset
        else:
            normalized_loudness = (dbfs - dbfs_min) / (0 - dbfs_min)
            controlled_loudness = normalized_loudness * amp_control
            adjusted_loudness = controlled_loudness + amp_offset
            return max(amp_offset, min(adjusted_loudness, amp_control + amp_offset))
        
    def interpolate_easing(self, values, easing_function):
        if len(values) < 3 or easing_function == "None":
            return values
        interpolated_values = [values[0]]
        for i in range(1, len(values) - 1):
            prev_val, curr_val, next_val = values[i - 1], values[i], values[i + 1]
            diff_prev = curr_val - prev_val
            diff_next = next_val - curr_val
            direction = 1 if diff_next > diff_prev else -1
            norm_diff = abs(diff_next) / (abs(diff_prev) + abs(diff_next) if abs(diff_prev) + abs(diff_next) != 0 else 1)
            eased_diff = easing_function(norm_diff) * direction
            interpolated_value = curr_val + eased_diff * (abs(diff_next) / 2)
            interpolated_values.append(interpolated_value)
        interpolated_values.append(values[-1])
        return interpolated_values

    def apply_easing(self, output, curves_mode):
        if curves_mode not in easing_functions or curves_mode == "None":
            return output
        easing_function = easing_functions[curves_mode]
        for key in ['left', 'right', 'average']:
            if key in ['left', 'right']:
                for subkey in output[key].keys():
                    output[key][subkey] = self.interpolate_easing(output[key][subkey], easing_function)
            else:
                output[key] = self.interpolate_easing(output[key], easing_function)
        return output

    def schedule(self, audio, amp_control, amp_offset, frame_rate, start_frame, end_frame, curves_mode, frequency_low=250, frequency_high=4000):
        audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        
        frame_duration_ms = int(1000 / frame_rate)
        start_ms = start_frame * frame_duration_ms
        
        total_length_ms = len(audio_segment)
        total_frames = total_length_ms // frame_duration_ms

        if end_frame <= 0:
            end_ms = total_length_ms
        else:
            end_ms = min(end_frame * frame_duration_ms, total_length_ms)

        audio_segment = audio_segment[start_ms:end_ms]

        if audio_segment.channels == 1:
            audio_segment = audio_segment.set_channels(2)

        dbfs_min, dbfs_max = self.dbfs_floor_ceiling(audio_segment)

        low_pass = audio_segment.low_pass_filter(frequency_low)
        high_pass = audio_segment.high_pass_filter(frequency_high)
        band_pass = audio_segment.high_pass_filter(frequency_low).low_pass_filter(frequency_high)

        output = {
            'left': {'low': [], 'mid': [], 'high': []},
            'right': {'low': [], 'mid': [], 'high': []},
            'average': []
        }

        max_frames = end_frame - start_frame

        for frame_start_ms in range(0, (max_frames * frame_duration_ms), frame_duration_ms):
            frame_end_ms = frame_start_ms + frame_duration_ms

            frame_segment = audio_segment[frame_start_ms:frame_end_ms]
            overall_loudness = self.dbfs2loudness(frame_segment.dBFS, amp_control, amp_offset, dbfs_min, dbfs_max)
            output['average'].append(overall_loudness)

            for channel_index in range(2):
                channel_filters = [low_pass, band_pass, high_pass]
                channel_key = 'left' if channel_index == 0 else 'right'

                for band, filter_segment in zip(['low', 'mid', 'high'], channel_filters):
                    frame_segment = filter_segment[frame_start_ms:frame_end_ms]
                    loudness = self.dbfs2loudness(frame_segment.dBFS, amp_control, amp_offset, dbfs_min, dbfs_max)
                    output[channel_key][band].append(loudness)

        if curves_mode != "None":
            output = self.apply_easing(output, curves_mode)

        average_low = [round((l + r) / 2, 2) for l, r in zip(output['left']['low'], output['right']['low'])]
        average_mid = [round((l + r) / 2, 2) for l, r in zip(output['left']['mid'], output['right']['mid'])]
        average_high = [round((l + r) / 2, 2) for l, r in zip(output['left']['high'], output['right']['high'])]

        for side in ['left', 'right']:
            for band in ['low', 'mid', 'high']:
                output[side][band] = [round(value, 2) for value in output[side][band]]
        output['average'] = [round(value, 2) for value in output['average']]

        return (
            output["left"]["low"], 
            output["left"]["mid"], 
            output["left"]["high"], 
            output["right"]["low"], 
            output["right"]["mid"], 
            output["right"]["high"], 
            average_low, 
            average_mid, 
            average_high, 
            output["average"], 
            max_frames, 
            frame_rate
        )

```
