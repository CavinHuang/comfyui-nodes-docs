
# Documentation
- Class name: FL_AudioPreview
- Category: 🏵️Fill Nodes
- Output node: True
- Repo Ref: https://github.com/FilipLe/filips-comfyui-nodes

FL_AudioPreview节点旨在播放音频片段，让用户能够在工作流程中预览音频数据。该节点支持单声道和立体声音频格式，并能处理以PyTorch张量或NumPy数组形式提供的音频数据。

# Input types
## Required
- audio_segment
    - 这是一个包含音频数据和其采样率的元组。此输入对于确定要播放的音频内容及其播放速度至关重要。
    - Comfy dtype: AUDIO
    - Python dtype: Tuple[Union[torch.Tensor, np.ndarray], int]

# Output types
该节点没有输出类型


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FL_AudioPreview:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {"audio_segment": ("AUDIO", {"description": "Tuple of (audio data tensor, sample rate)"})},
        }
    FUNCTION = "play_audio_segment"
    CATEGORY = "🏵️Fill Nodes"
    OUTPUT_NODE = True
    RETURN_TYPES = ()

    @classmethod
    def play_audio_segment(cls, audio_segment):
        waveform, sample_rate = audio_segment

        # Check if waveform is a PyTorch tensor and convert to numpy array accordingly
        if isinstance(waveform, torch.Tensor):
            numpy_waveform = waveform.cpu().numpy()
        elif isinstance(waveform, np.ndarray):
            numpy_waveform = waveform
        else:
            raise TypeError("Unsupported type for waveform. Expected torch.Tensor or np.ndarray.")

        # Check if the audio is stereo or mono and play accordingly
        if numpy_waveform.shape[0] > 1:
            # If stereo, playing the first channel for simplicity
            sd.play(numpy_waveform[0], sample_rate)
        else:
            # If mono, play as is
            sd.play(numpy_waveform, sample_rate)

        print ("""
        ---------
        Will resume after audio preview completes
        ---------
        """)

        sd.wait()
        return []

```
