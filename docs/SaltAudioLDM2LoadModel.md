
# Documentation
- Class name: SaltAudioLDM2LoadModel
- Category: SALT/Audio/AudioLDM2
- Output node: False

这个节点旨在从预定义的模型集中加载特定的音频模型。它有助于初始化针对音频潜在扩散任务优化设置的音频模型，确保模型为进一步的音频处理或生成任务做好准备。

# Input types
## Required
- model
    - 指定要加载的模型，从预定义的音频潜在扩散模型列表中选择。此选择决定了加载模型的特定音频处理能力和特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- device
    - 确定加载模型的计算设备（'cuda'或'cpu'），影响性能和效率。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- audioldm2_model
    - 加载的音频潜在扩散模型，可用于音频处理或生成任务。
    - Comfy dtype: AUDIOLDM_MODEL
    - Python dtype: AudioLDM2Pipeline


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioLDM2LoadModel:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": (["cvssp/audioldm2", "cvssp/audioldm2-large", "cvssp/audioldm2-music"], ),
            },
            "optional": {
                "device": (["cuda", "cpu"], ),
            },
        }
    
    RETURN_TYPES = ("AUDIOLDM_MODEL", )
    RETURN_NAMES = ("audioldm2_model", )

    FUNCTION = "load_model"
    CATEGORY = "SALT/Audio/AudioLDM2"

    def load_model(self, model, device="cuda"):
        models = folder_paths.models_dir
        audioldm2_models = os.path.join(models, "AudioLDM2")
        return (AudioLDM2Pipeline.from_pretrained(model, cache_dir=audioldm2_models, torch_dtype=torch.float16).to(device), )

```
