---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
---

# Diffusers Hub Model Down-Loader
## Documentation
- Class name: `Diffusers Hub Model Down-Loader`
- Category: `WAS Suite/Loaders/Advanced`
- Output node: `False`

This node is designed to download and load models from the Hugging Face Hub, specifically tailored for diffusers models. It handles the retrieval of models by their repository ID and optional revision, facilitating the integration of these models into the workflow.
## Input types
### Required
- **`repo_id`**
    - The repository ID on Hugging Face Hub from which the model should be downloaded. It is crucial for identifying the specific model to be retrieved.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`revision`**
    - An optional revision identifier for the model, allowing for the selection of specific versions of the model from the repository. If not specified, the latest version is retrieved.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The loaded diffusers model.
    - Python dtype: `torch.nn.Module`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The CLIP model associated with the diffusers model, if available.
    - Python dtype: `torch.nn.Module`
- **`VAE`**
    - Comfy dtype: `VAE`
    - The VAE model associated with the diffusers model, if available.
    - Python dtype: `torch.nn.Module`
- **`NAME_STRING`**
    - Comfy dtype: `STRING`
    - The repository ID of the loaded model, serving as a unique identifier.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Diffusers_Hub_Model_Loader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "repo_id": ("STRING", {"multiline":False}),
                              "revision": ("STRING", {"default": "None", "multiline":False})}}
    RETURN_TYPES = ("MODEL", "CLIP", "VAE", TEXT_TYPE)
    RETURN_NAMES = ("MODEL", "CLIP", "VAE", "NAME_STRING")
    FUNCTION = "load_hub_checkpoint"

    CATEGORY = "WAS Suite/Loaders/Advanced"

    def load_hub_checkpoint(self, repo_id=None, revision=None):
        if revision in ["", "None", "none", None]:
            revision = None
        model_path = comfy_paths.get_folder_paths("diffusers")[0]
        self.download_diffusers_model(repo_id, model_path, revision)
        diffusersLoader = nodes.DiffusersLoader()
        model, clip, vae = diffusersLoader.load_checkpoint(os.path.join(model_path, repo_id))
        return (model, clip, vae, repo_id)

    def download_diffusers_model(self, repo_id, local_dir, revision=None):
        if 'huggingface-hub' not in packages():
            install_package("huggingface_hub")

        from huggingface_hub import snapshot_download
        model_path = os.path.join(local_dir, repo_id)
        ignore_patterns = ["*.ckpt","*.safetensors","*.onnx"]
        snapshot_download(repo_id=repo_id, repo_type="model", local_dir=model_path, revision=revision, use_auth_token=False, ignore_patterns=ignore_patterns)

```
