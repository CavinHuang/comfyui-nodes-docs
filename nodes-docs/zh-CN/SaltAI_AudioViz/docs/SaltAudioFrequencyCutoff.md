
# Documentation
- Class name: SaltAudioFrequencyCutoff
- Category: SALT/Audio/Effect
- Output node: False

此节点使用FFmpeg对音频文件应用频率截止，以滤除指定截止点以上或以下的频率。它旨在修改音频的频谱，可以通过衰减某个阈值以外的频率或增强特定频率范围内的音频来实现。

# Input types
## Required
- audio
    - 需要处理的原始音频数据。这个参数至关重要，因为它代表了将要进行频率截止操作的音频内容。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- filter_type
    - 指定要应用的滤波器类型（例如低通或高通），决定是衰减截止频率以上还是以下的频率。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- cutoff_frequency
    - 滤波器的频率阈值。根据滤波器类型，该值以上或以下的频率将被衰减。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- audio
    - 应用频率截止后的修改后的音频数据。这个输出反映了对音频频谱所做的更改。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioFrequencyCutoff:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", ),
                "filter_type": (["lowpass", "highpass"], ),
                "cutoff_frequency": ("INT", {"min": 20, "max": 20000, "default": 1000}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "apply_cutoff"
    CATEGORY = "SALT/Audio/Effect"

    def apply_cutoff(self, audio, filter_type, cutoff_frequency):
        TEMP = folder_paths.get_temp_directory()
        os.makedirs(TEMP, exist_ok=True)

        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav', dir=TEMP) as temp_input:
            temp_input.write(audio)
            temp_input_path = temp_input.name

        temp_output_path = tempfile.mktemp(suffix='.wav', dir=TEMP)
        
        filter_command = f"{filter_type}=f={cutoff_frequency}"
        command = [ffmpeg_path, '-y', "-i", temp_input_path, "-af", filter_command, temp_output_path]

        try:
            subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            
            with open(temp_output_path, "rb") as temp_output:
                modified_audio_data = temp_output.read()
                
            os.unlink(temp_input_path)
            os.unlink(temp_output_path)
                
            return (modified_audio_data,)
        except subprocess.CalledProcessError as e:
            print(f"Failed to apply frequency cutoff with FFmpeg: {e}")
            if os.path.exists(temp_input_path):
                os.unlink(temp_input_path)
            if os.path.exists(temp_output_path):
                os.unlink(temp_output_path)
            return (audio,)

```
