
# Documentation
- Class name: SaltAudioFrequencyBoost
- Category: SALT/Audio/Effect
- Output node: False

本节点旨在通过选择性地提升音频信号的频率来增强音频体验。它允许对音频的频谱进行精确调整，增强特定的频带以达到所需的音频特性。

# Input types
## Required
- audio
    - 待处理的原始音频数据。这一输入对于定义将要进行频率增强的音频内容至关重要。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- frequency
    - 指定要提升的中心频率，允许在音频频谱内进行有针对性的增强。
    - Comfy dtype: INT
    - Python dtype: int
- bandwidth
    - 定义围绕中心频率将被提升的频带宽度，决定受影响的频率范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- gain_dB
    - 应用于指定频带的增益量，以分贝(dB)为单位，控制提升的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - 频率提升应用后的音频数据，反映了对指定频带所做的增强。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioFrequencyBoost:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", ),
                "frequency": ("INT", {"min": 20, "max": 20000, "default": 1000}), 
                "bandwidth": ("FLOAT", {"default": 2.0}),
                "gain_dB": ("FLOAT", {"min": -60, "max": 60, "default": 0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "boost_frequency"
    CATEGORY = "SALT/Audio/Effect"

    def boost_frequency(self, audio, frequency, bandwidth, gain_dB):
        TEMP = folder_paths.get_temp_directory()
        os.makedirs(TEMP, exist_ok=True)

        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav', dir=TEMP) as temp_input:
            temp_input.write(audio)
            temp_input_path = temp_input.name

        temp_output_path = tempfile.mktemp(suffix='.wav', dir=TEMP)
        
        eq_filter = f"equalizer=f={frequency}:width_type=o:width={bandwidth}:g={gain_dB}"
        command = [ffmpeg_path, "-y", "-i", temp_input_path, "-af", eq_filter, temp_output_path]

        try:
            subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            with open(temp_output_path, "rb") as temp_output:
                modified_audio_data = temp_output.read()
                
            os.unlink(temp_input_path)
            os.unlink(temp_output_path)
                
            return (modified_audio_data,)
        except subprocess.CalledProcessError as e:
            print(f"Failed to apply frequency boost with FFmpeg: {e}")
            if os.path.exists(temp_input_path):
                os.unlink(temp_input_path)
            if os.path.exists(temp_output_path):
                os.unlink(temp_output_path)
            return (audio,)

```
