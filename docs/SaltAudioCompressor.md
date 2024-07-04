
# Documentation
- Class name: `SaltAudioCompressor`
- Category: `SALT/Audio/Process`
- Output node: `False`

SaltAudioCompressor节点旨在动态减少音频信号的动态范围。它通过压缩使较大声音变小，较小声音变大，从而实现更一致的整体音量水平。

# Input types
## Required
- audio
    - 需要进行压缩处理的原始音频数据。这个输入对压缩过程至关重要，通过调整音频的动态范围来影响最终输出。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- threshold_dB
    - 以分贝为单位的阈值水平。超过这个水平的声音将被压缩。它决定了开始压缩的点，影响音频的响度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ratio
    - 压缩比，指示超过阈值的音频将被压缩的程度。它影响应用于音频的压缩强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attack_ms
    - 以毫秒为单位的起音时间。它指定了音频超过阈值后压缩器开始工作的速度，影响压缩的响应性。
    - Comfy dtype: INT
    - Python dtype: float
- release_ms
    - 以毫秒为单位的释放时间。它定义了音频降到阈值以下后压缩器停止影响音频的速度，影响音频输出的平滑度。
    - Comfy dtype: INT
    - Python dtype: float

# Output types
- audio
    - 动态范围被压缩后的音频数据。这个输出是对输入音频应用压缩处理的直接结果。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioCompressor:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "threshold_dB": ("FLOAT", {"default": -20.0, "min": -60.0, "max": 0.0}),
                "ratio": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 20.0}),
                "attack_ms": ("INT", {"default": 50, "min": 0, "max": 1000}),
                "release_ms": ("INT", {"default": 200, "min": 0, "max": 3000}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "compress_audio"
    CATEGORY = "SALT/Audio/Process"

    def compress_audio(self, audio, threshold_dB, ratio, attack_ms, release_ms):
        TEMP = folder_paths.get_temp_directory()
        os.makedirs(TEMP, exist_ok=True)

        audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        temp_input_path = tempfile.mktemp(suffix='.wav', dir=TEMP)
        temp_output_path = tempfile.mktemp(suffix='.wav', dir=TEMP)

        audio_segment.export(temp_input_path, format="wav")
        points = f"-80/-80|-60/-60|{threshold_dB}/{threshold_dB + (20 / ratio)}|20/20"
        
        command = [
            'ffmpeg', '-y', '-i', temp_input_path,
            '-filter_complex',
            f'compand=attacks={attack_ms / 1000.0}:decays={release_ms / 1000.0}:points={points}',
            temp_output_path
        ]

        subprocess.run(command, check=True)
        
        with open(temp_output_path, 'rb') as f:
            compressed_audio = f.read()

        os.remove(temp_input_path)
        os.remove(temp_output_path)

        return (compressed_audio,)

```
