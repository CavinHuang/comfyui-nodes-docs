---
tags:
- Audio
---

# PlaySound 🐍
## Documentation
- Class name: `PlaySound|pysssss`
- Category: `utils`
- Output node: `True`

The PlaySound node is designed to play audio files with customizable settings such as volume and playback mode. It abstracts the complexity of audio playback, offering a simple interface for triggering sound effects or notifications within a workflow.
## Input types
### Required
- **`any`**
    - Acts as a wildcard input, allowing for flexible integration with various data types or structures without enforcing a specific format.
    - Comfy dtype: `*`
    - Python dtype: `AnyType`
- **`mode`**
    - Determines the playback condition, either always playing the sound or only when the queue is empty, thus providing control over the sound's occurrence.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`volume`**
    - Controls the audio volume on a scale from 0 to 1, enabling fine-tuned adjustments to the sound level.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`file`**
    - Specifies the audio file to be played, with a default option provided, allowing for customization of the sound effect.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`*`**
    - Comfy dtype: `*`
    - unknown
    - Python dtype: `unknown`
- **`ui`**
    - Returns a UI component structure, although in this context, it appears to be a placeholder with no active elements.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PlaySound:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "any": (any, {}),
            "mode": (["always", "on empty queue"], {}),
            "volume": ("FLOAT", {"min": 0, "max": 1, "step": 0.1, "default": 0.5}),
            "file": ("STRING", { "default": "notify.mp3" })
        }}

    FUNCTION = "nop"
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)
    OUTPUT_NODE = True
    RETURN_TYPES = (any,)

    CATEGORY = "utils"

    def IS_CHANGED(self, **kwargs):
        return float("NaN")

    def nop(self, any, mode, volume, file):
        return {"ui": {"a": []}, "result": (any,)}

```
