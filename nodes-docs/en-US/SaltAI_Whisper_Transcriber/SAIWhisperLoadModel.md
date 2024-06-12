# Whisper Model Loader
## Documentation
- Class name: `SAIWhisperLoadModel`
- Category: `SALT/Whisper`
- Output node: `False`

The SAIWhisperLoadModel node is designed to load a specified Whisper model into memory, making it ready for speech-to-text operations. It supports a range of Whisper model versions and allows for device specification to optimize performance.
## Input types
### Required
- **`model`**
    - Specifies the Whisper model version to load. Supports multiple versions including large, base, medium, small, and tiny variants, as well as a distil version for efficient processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
### Optional
- **`device`**
    - Determines the computational device ('cuda' or 'cpu') the loaded model will utilize, allowing for flexibility based on available hardware.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`model`**
    - Comfy dtype: `WHISPER_MODEL`
    - The loaded Whisper model along with its processor and the device it's loaded onto, ready for speech-to-text processing.
    - Python dtype: `Tuple[torch.nn.Module, AutoProcessor, str]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SAIWhisperLoadModel:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": (["openai/whisper-large-v2", "openai/whisper-large-v3", "openai/whisper-base", "openai/whisper-large", "openai/whisper-medium", "openai/whisper-small", "openai/whisper-tiny", "distil-whisper/distil-large-v3", ], ),
            },
            "optional": {
                "device": (["cuda", "cpu"], ),
            },
        }
    
    RETURN_TYPES = ("WHISPER_MODEL",)
    RETURN_NAMES = ("model", "processor")

    FUNCTION = "load_model"
    CATEGORY = "SALT/Whisper"

    def load_model(self, model, device="cuda"):
        whisper_model = AutoModelForSpeechSeq2Seq.from_pretrained(model, cache_dir=WHISPER_MODELS, use_safetensors=True).to(device)
        processor = AutoProcessor.from_pretrained(model)
        return ((whisper_model, processor, device), )

```
