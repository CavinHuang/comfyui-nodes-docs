---
tags:
- AnimationScheduling
---

# FL Audio Preview
## Documentation
- Class name: `FL_AudioPreview`
- Category: `🏵️Fill Nodes`
- Output node: `True`

The FL_AudioPreview node is designed to play audio segments, allowing users to preview audio data within their workflow. It supports both mono and stereo audio formats and can handle audio data provided as either PyTorch tensors or numpy arrays.
## Input types
### Required
- **`audio_segment`**
    - A tuple containing the audio data and its sample rate. This input is crucial for determining the audio content to be played and its playback speed.
    - Comfy dtype: `AUDIO`
    - Python dtype: `Tuple[Union[torch.Tensor, np.ndarray], int]`
## Output types
The node doesn't have output types
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
