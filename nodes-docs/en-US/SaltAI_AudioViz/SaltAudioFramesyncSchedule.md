---
tags:
- AnimationScheduling
- Scheduling
---

# Schedule Audio Framesync
## Documentation
- Class name: `SaltAudioFramesyncSchedule`
- Category: `SALT/Audio/Scheduling`
- Output node: `False`

The SaltAudioFramesyncSchedule node is designed to synchronize audio with visual elements by scheduling frames based on audio analysis. It facilitates the creation of audio-visual content by aligning keyframes with specific audio cues, enabling dynamic visual effects that are in harmony with the audio track.
## Input types
### Required
- **`audio`**
    - The audio input for which the frame synchronization schedule will be generated. It is crucial for determining the timing and dynamics of the visual effects in relation to the audio.
    - Comfy dtype: `AUDIO`
    - Python dtype: `np.ndarray`
- **`amp_control`**
    - Controls the amplitude sensitivity of the audio analysis, affecting how audio levels influence the frame scheduling.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`amp_offset`**
    - An offset value for the amplitude, allowing for fine-tuning of the frame scheduling in relation to the audio amplitude.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`frame_rate`**
    - The frame rate at which the visual elements will be synchronized with the audio, determining the timing precision of the synchronization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_frame`**
    - The starting frame for the synchronization schedule, enabling targeted synchronization within a specific segment of the audio-visual content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_frame`**
    - The ending frame for the synchronization schedule, defining the scope of the audio-visual synchronization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`curves_mode`**
    - Specifies the easing function to be used for the amplitude control, influencing the dynamic response of the visual effects to the audio.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
### Optional
- **`frequency_low`**
    - The lower bound of the frequency range to be considered for the audio analysis, affecting the selection of audio content that influences the frame scheduling.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`frequency_high`**
    - The upper bound of the frequency range to be considered for the audio analysis, affecting the selection of audio content that influences the frame scheduling.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`left_low_schedule`**
    - Comfy dtype: `LIST`
    - The scheduled frames for the low frequency range of the left audio channel.
    - Python dtype: `list`
- **`left_mid_schedule`**
    - Comfy dtype: `LIST`
    - The scheduled frames for the mid frequency range of the left audio channel.
    - Python dtype: `list`
- **`left_high_schedule`**
    - Comfy dtype: `LIST`
    - The scheduled frames for the high frequency range of the left audio channel.
    - Python dtype: `list`
- **`right_low_schedule`**
    - Comfy dtype: `LIST`
    - The scheduled frames for the low frequency range of the right audio channel.
    - Python dtype: `list`
- **`right_mid_schedule`**
    - Comfy dtype: `LIST`
    - The scheduled frames for the mid frequency range of the right audio channel.
    - Python dtype: `list`
- **`right_high_schedule`**
    - Comfy dtype: `LIST`
    - The scheduled frames for the high frequency range of the right audio channel.
    - Python dtype: `list`
- **`average_low`**
    - Comfy dtype: `LIST`
    - The average frame scheduling for the low frequency range across both audio channels.
    - Python dtype: `list`
- **`average_mid`**
    - Comfy dtype: `LIST`
    - The average frame scheduling for the mid frequency range across both audio channels.
    - Python dtype: `list`
- **`average_high`**
    - Comfy dtype: `LIST`
    - The average frame scheduling for the high frequency range across both audio channels.
    - Python dtype: `list`
- **`average_schedule`**
    - Comfy dtype: `LIST`
    - The overall average frame scheduling across all frequency ranges and channels.
    - Python dtype: `list`
- **`frame_count`**
    - Comfy dtype: `INT`
    - The total count of frames scheduled.
    - Python dtype: `int`
- **`frame_rate`**
    - Comfy dtype: `INT`
    - The frame rate used for scheduling.
    - Python dtype: `int`
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
