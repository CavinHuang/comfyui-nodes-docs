
# Documentation
- Class name: SAIWhisperLoadModel
- Category: SALT/Whisper
- Output node: False

SAIWhisperLoadModel节点旨在将指定的Whisper模型加载到内存中，为语音转文本操作做好准备。它支持多种Whisper模型版本，并允许指定设备以优化性能。

# Input types
## Required
- model
    - 指定要加载的Whisper模型版本。支持多个版本，包括large、base、medium、small和tiny变体，以及用于高效处理的distil版本。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
## Optional
- device
    - 确定加载模型将使用的计算设备（'cuda'或'cpu'），根据可用硬件提供灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
- model
    - 加载的Whisper模型及其处理器和加载到的设备，准备好进行语音转文本处理。
    - Comfy dtype: WHISPER_MODEL
    - Python dtype: Tuple[torch.nn.Module, AutoProcessor, str]


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
