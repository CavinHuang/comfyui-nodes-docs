---
tags:
- Face
- FaceRestoration
---

# Load Face Enhance Model (mtb)
## Documentation
- Class name: `Load Face Enhance Model (mtb)`
- Category: `mtb/facetools`
- Output node: `False`

This node is responsible for loading a face enhancement model, specifically GFPGAN or RestoreFormer, to improve the quality of facial images. It supports model selection and optional background upsampling for comprehensive face restoration.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the face enhancement model to load. The choice of model affects the enhancement technique applied to the facial images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale`**
    - Determines the upscale factor for the face enhancement process, directly influencing the resolution improvement of the output images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`bg_upsampler`**
    - An optional background upsampler model to enhance the background of the facial images alongside the face enhancement model.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `Optional[BGUpscaleWrapper]`
## Output types
- **`model`**
    - Comfy dtype: `FACEENHANCE_MODEL`
    - The loaded face enhancement model, ready for use in enhancing facial images.
    - Python dtype: `GFPGANer`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_LoadFaceEnhanceModel:
    """Loads a GFPGan or RestoreFormer model for face enhancement."""

    def __init__(self) -> None:
        pass

    @classmethod
    def get_models_root(cls):
        fr = get_model_path("face_restore")
        # fr = Path(folder_paths.models_dir) / "face_restore"
        if fr.exists():
            return (fr, None)

        um = get_model_path("upscale_models")
        return (fr, um) if um.exists() else (None, None)

    @classmethod
    def get_models(cls):
        fr_models_path, um_models_path = cls.get_models_root()

        if fr_models_path is None and um_models_path is None:
            log.warning("Face restoration models not found.")
            return []
        if not fr_models_path.exists():
            # log.warning(
            #     f"No Face Restore checkpoints found at {fr_models_path} (if you've used mtb before these checkpoints were saved in upscale_models before)"
            # )
            # log.warning(
            #     "For now we fallback to upscale_models but this will be removed in a future version"
            # )
            if um_models_path.exists():
                return [
                    x
                    for x in um_models_path.iterdir()
                    if x.name.endswith(".pth")
                    and ("GFPGAN" in x.name or "RestoreFormer" in x.name)
                ]
            return []

        return [
            x
            for x in fr_models_path.iterdir()
            if x.name.endswith(".pth")
            and ("GFPGAN" in x.name or "RestoreFormer" in x.name)
        ]

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model_name": (
                    [x.name for x in cls.get_models()],
                    {"default": "None"},
                ),
                "upscale": ("INT", {"default": 1}),
            },
            "optional": {"bg_upsampler": ("UPSCALE_MODEL", {"default": None})},
        }

    RETURN_TYPES = ("FACEENHANCE_MODEL",)
    RETURN_NAMES = ("model",)
    FUNCTION = "load_model"
    CATEGORY = "mtb/facetools"

    def load_model(self, model_name, upscale=2, bg_upsampler=None):
        from gfpgan import GFPGANer

        basic = "RestoreFormer" not in model_name

        fr_root, um_root = self.get_models_root()

        if bg_upsampler is not None:
            log.warning(
                f"Upscale value overridden to {bg_upsampler.scale} from bg_upsampler"
            )
            upscale = bg_upsampler.scale
            bg_upsampler = BGUpscaleWrapper(bg_upsampler)

        sys.stdout = NullWriter()
        model = GFPGANer(
            model_path=(
                (fr_root if fr_root.exists() else um_root) / model_name
            ).as_posix(),
            upscale=upscale,
            arch="clean"
            if basic
            else "RestoreFormer",  # or original for v1.0 only
            channel_multiplier=2,  # 1 for v1.0 only
            bg_upsampler=bg_upsampler,
        )

        sys.stdout = sys.__stdout__
        return (model,)

```
