
# Documentation
- Class name: SaltAudioVisualizer
- Category: SALT/Audio/Util
- Output node: True

SaltAudioVisualizer节点旨在创建音频数据的视觉表示。它处理音频输入以生成可用于分析或美学目的的可视化效果，突出显示音频的结构、频率内容和动态特性。

# Input types
## Required
- audio
    - 'audio'参数是可视化过程的主要输入，代表要进行可视化的音频数据。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- frame_rate
    - 'frame_rate'参数指定可视化的帧率，影响生成的视觉输出的时间分辨率。
    - Comfy dtype: INT
    - Python dtype: int

## Optional
- start_frame
    - 'start_frame'参数定义要可视化的音频片段的起始点，允许选择性地可视化音频的特定部分。
    - Comfy dtype: INT
    - Python dtype: int
- end_frame
    - 'end_frame'参数确定要可视化的音频片段的结束点，能够自定义可视化的长度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
该节点没有输出类型


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioVisualizer:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "frame_rate": ("INT", {"default": 8, "min": 1, "max": 244}),
            },
            "optional": {
                "start_frame": ("INT", {"min": 0, "default": 0}),
                "end_frame": ("INT", {"min": 0, "default": -1}),
            },
        }

    RETURN_TYPES = ()
    RETURN_NAMES = ()
    OUTPUT_NODE = True

    FUNCTION = "visualize_audio"
    CATEGORY = "SALT/Audio/Util"

    def visualize_audio(self, audio, frame_rate, start_frame=0, end_frame=-1):
        TEMP = folder_paths.get_temp_directory()
        os.makedirs(TEMP, exist_ok=True)

        audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav", dir=TEMP)
        
        frame_duration_ms = 1000 / frame_rate
        start_ms = start_frame * frame_duration_ms
        end_ms = end_frame * frame_duration_ms if end_frame != -1 else len(audio_segment)
        
        relevant_audio_segment = audio_segment[start_ms:end_ms]

        samples = np.array(relevant_audio_segment.get_array_of_samples())
        if relevant_audio_segment.channels == 2:
            samples = samples.reshape((-1, 2))
            samples = samples.sum(axis=1) / 2

        max_val = max(abs(samples.min()), samples.max())
        normalized_samples = samples / max_val

        total_frames = len(normalized_samples) / (audio_segment.frame_rate / frame_rate)
        frame_numbers = np.linspace(start_frame, start_frame + total_frames, num=len(normalized_samples), endpoint=False)

        plt.figure(figsize=(10, 4))
        plt.plot(frame_numbers, normalized_samples, linewidth=0.5)
        plt.title("Audio Visualization")
        plt.ylim(-1, 1) 
        plt.xlabel("Frame")
        plt.ylabel("Amplitude")
        
        filename = str(uuid.uuid4())+"_visualization.png"
        file_path = os.path.join(TEMP, filename)
        plt.savefig(file_path)
        plt.close()

        ui_output = {
            "ui": {
                "images": [
                    {
                        "filename": filename,
                        "subfolder": "",
                        "type": "temp"
                    }
                ]
            }
        }

        return ui_output
    
    @staticmethod
    def gen_hash(input_dict):
        sorted_json = json.dumps(input_dict, sort_keys=True)
        hash_obj = hashlib.sha256()
        hash_obj.update(sorted_json.encode('utf-8'))
        return hash_obj.hexdigest()
    
    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return cls.gen_hash(kwargs)

```
