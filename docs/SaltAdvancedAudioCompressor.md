
# Documentation
- Class name: SaltAdvancedAudioCompressor
- Category: SALT/Audio/Process
- Output node: False

SaltAdvancedAudioCompressor节点旨在提供高级音频压缩功能，允许通过阈值、比率、启动时间、释放时间和补偿增益等参数对压缩过程进行精细控制。它利用ffmpeg应用压缩，为各种应用场景下调整音频内容的动态范围提供了一种方法。

# Input types
## Required
- audio
    - 待压缩的原始音频数据。这个输入至关重要，因为它代表将要进行压缩的音频内容，直接影响输出的质量和特性。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- threshold_dB
    - 压缩器的阈值水平，以分贝（dB）为单位。高于此水平的信号将被压缩，这是一个关键参数，用于确定开始压缩的音量水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ratio
    - 压缩比，表示信号超过阈值后被减少的程度。这个参数影响压缩效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attack_ms
    - 启动时间，以毫秒（ms）为单位，定义了压缩器对超过阈值的音频作出反应的速度。较短的启动时间会导致瞬态声音被更快地压缩。
    - Comfy dtype: INT
    - Python dtype: float
- release_ms
    - 释放时间，以毫秒（ms）为单位，指定了在音频降至阈值以下后，压缩器停止影响音频的速度。这个参数影响音频动态变化的平滑程度。
    - Comfy dtype: INT
    - Python dtype: float
- makeup_gain
    - 补偿增益，以分贝（dB）为单位，在压缩后应用，用于恢复或增加音频信号的整体水平。这允许补偿压缩过程中损失的音量。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - 经过指定压缩设置处理后的压缩音频数据。这个输出反映了对音频动态范围所做的调整，适用于进一步处理或播放。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAdvancedAudioCompressor:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "threshold_dB": ("FLOAT", {"default": -20.0, "min": -60.0, "max": 0.0}),
                "ratio": ("FLOAT", {"default": 4.0, "min": 1.0, "max": 20.0}),
                "attack_ms": ("INT", {"default": 5, "min": 1, "max": 100}),
                "release_ms": ("INT", {"default": 50, "min": 10, "max": 1000}),
                "makeup_gain": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 24.0}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "compress_detailed_audio"
    CATEGORY = "SALT/Audio/Process"

    def compress_detailed_audio(self, audio, threshold_dB, ratio, attack_ms, release_ms, makeup_gain):
        TEMP = folder_paths.get_temp_directory()
        os.makedirs(TEMP, exist_ok=True)

        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav', dir=TEMP) as temp_input:
            temp_input.write(audio)
            temp_input_path = temp_input.name

        temp_output_path = tempfile.mktemp(suffix='.wav', dir=TEMP)
        attack_sec = max(attack_ms / 1000.0, 0.01)
        release_sec = max(release_ms / 1000.0, 0.01)
        command = [
            'ffmpeg', '-y', '-i', temp_input_path,
            '-af', f'acompressor=threshold={threshold_dB}dB:ratio={ratio}:attack={attack_sec}:release={release_sec}:makeup={makeup_gain}dB',
            temp_output_path
        ]

        subprocess.run(command, check=True)
        
        with open(temp_output_path, 'rb') as temp_output:
            compressed_audio = temp_output.read()

        os.unlink(temp_input_path)
        os.unlink(temp_output_path)

        return (compressed_audio,)

```
