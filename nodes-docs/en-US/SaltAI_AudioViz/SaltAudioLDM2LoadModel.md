---
tags:
- Audio
---

# AudioLDM2 Model Loader
## Documentation
- Class name: `SaltAudioLDM2LoadModel`
- Category: `SALT/Audio/AudioLDM2`
- Output node: `False`

This node is designed to load a specific audio model from a predefined set of models tailored for audio processing tasks. It facilitates the initialization of audio models with optimized settings for audio latent diffusion tasks, ensuring that the model is ready for further audio processing or generation tasks.
## Input types
### Required
- **`model`**
    - Specifies the model to be loaded, chosen from a predefined list of audio latent diffusion models. This selection determines the specific audio processing capabilities and characteristics of the loaded model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`device`**
    - Determines the computing device ('cuda' or 'cpu') on which the model will be loaded, affecting performance and efficiency.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`audioldm2_model`**
    - Comfy dtype: `AUDIOLDM_MODEL`
    - The loaded audio latent diffusion model, ready for use in audio processing or generation tasks.
    - Python dtype: `AudioLDM2Pipeline`
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
