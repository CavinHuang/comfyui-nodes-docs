---
tags:
- SAM
---

# SAM Model Loader
## Documentation
- Class name: `SAM Model Loader`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

The SAM Model Loader node is designed to facilitate the loading of SAM (Segment Anything Model) models, specifically tailored for image segmentation tasks. It supports loading different sizes of the SAM model, including ViT-H, ViT-L, and ViT-B, by downloading the model if it's not already present locally and then initializing it for use.
## Input types
### Required
- **`model_size`**
    - Specifies the size of the SAM model to be loaded. The size can be 'ViT-H', 'ViT-L', or 'ViT-B', each corresponding to a different configuration of the model, affecting its performance and accuracy.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`sam_model`**
    - Comfy dtype: `SAM_MODEL`
    - The loaded SAM model, ready for use in image segmentation tasks. It is initialized based on the specified model size and can be directly utilized for processing images.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_SAM_Model_Loader:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "model_size": (["ViT-H", "ViT-L", "ViT-B"], ),
            }
        }

    RETURN_TYPES = ("SAM_MODEL",)
    FUNCTION = "sam_load_model"

    CATEGORY = "WAS Suite/Image/Masking"

    def sam_load_model(self, model_size):
        conf = getSuiteConfig()

        model_filename_mapping = {
            "ViT-H": "sam_vit_h_4b8939.pth",
            "ViT-L": "sam_vit_l_0b3195.pth",
            "ViT-B": "sam_vit_b_01ec64.pth",
        }

        model_url_mapping = {
            "ViT-H": conf['sam_model_vith_url'] if conf.__contains__('sam_model_vith_url') else r"https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth",
            "ViT-L": conf['sam_model_vitl_url'] if conf.__contains__('sam_model_vitl_url') else r"https://dl.fbaipublicfiles.com/segment_anything/sam_vit_l_0b3195.pth",
            "ViT-B": conf['sam_model_vitb_url'] if conf.__contains__('sam_model_vitb_url') else r"https://dl.fbaipublicfiles.com/segment_anything/sam_vit_b_01ec64.pth",
        }

        model_url = model_url_mapping[model_size]
        model_filename = model_filename_mapping[model_size]

        if 'GitPython' not in packages():
            install_package("gitpython")

        if not os.path.exists(os.path.join(WAS_SUITE_ROOT, 'repos'+os.sep+'SAM')):
            from git.repo.base import Repo
            cstr("Installing SAM...").msg.print()
            Repo.clone_from('https://github.com/facebookresearch/segment-anything', os.path.join(WAS_SUITE_ROOT, 'repos'+os.sep+'SAM'))

        sys.path.append(os.path.join(WAS_SUITE_ROOT, 'repos'+os.sep+'SAM'))

        sam_dir = os.path.join(MODELS_DIR, 'sam')
        if not os.path.exists(sam_dir):
            os.makedirs(sam_dir, exist_ok=True)

        sam_file = os.path.join(sam_dir, model_filename)
        if not os.path.exists(sam_file):
            cstr("Selected SAM model not found. Downloading...").msg.print()
            r = requests.get(model_url, allow_redirects=True)
            open(sam_file, 'wb').write(r.content)

        from segment_anything import build_sam_vit_h, build_sam_vit_l, build_sam_vit_b

        if model_size == 'ViT-H':
            sam_model = build_sam_vit_h(sam_file)
        elif model_size == 'ViT-L':
            sam_model = build_sam_vit_l(sam_file)
        elif model_size == 'ViT-B':
            sam_model = build_sam_vit_b(sam_file)
        else:
            raise ValueError(f"SAM model does not match the model_size: '{model_size}'.")

        return (sam_model, )

```
