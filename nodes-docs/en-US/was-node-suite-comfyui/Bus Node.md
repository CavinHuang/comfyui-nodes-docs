---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
- ModelSwitching
---

# Bus Node
## Documentation
- Class name: `Bus Node`
- Category: `WAS Suite/Utilities`
- Output node: `False`

The 'Bus Node' serves as a central hub for routing and overriding various components such as models, CLIP, VAE, and conditioning inputs within a generative AI pipeline. It facilitates the dynamic interchange and management of these components, ensuring that the most appropriate resources are utilized for each operation.
## Input types
### Required
### Optional
- **`bus`**
    - A tuple containing references to a model, CLIP, VAE, positive conditioning, and negative conditioning. It acts as a conduit for passing these components through the pipeline, allowing for their dynamic interchange and management.
    - Comfy dtype: `BUS`
    - Python dtype: `Tuple[Optional[torch.nn.Module], Optional[Any], Optional[Any], Optional[Any], Optional[Any]]`
- **`model`**
    - A specific model to be used in the operation. If provided, it overrides the model component of the bus.
    - Comfy dtype: `MODEL`
    - Python dtype: `Optional[torch.nn.Module]`
- **`clip`**
    - A specific CLIP model to be used in the operation. If provided, it overrides the CLIP component of the bus.
    - Comfy dtype: `CLIP`
    - Python dtype: `Optional[Any]`
- **`vae`**
    - A specific VAE model to be used in the operation. If provided, it overrides the VAE component of the bus.
    - Comfy dtype: `VAE`
    - Python dtype: `Optional[Any]`
- **`positive`**
    - Positive conditioning to influence the generation towards desired attributes. If provided, it overrides the positive conditioning component of the bus.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[Any]`
- **`negative`**
    - Negative conditioning to influence the generation away from undesired attributes. If provided, it overrides the negative conditioning component of the bus.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[Any]`
## Output types
- **`bus`**
    - Comfy dtype: `BUS`
    - A tuple representing the updated state of the bus, containing the current set of components (model, CLIP, VAE, positive conditioning, negative conditioning) after any overrides.
    - Python dtype: `Tuple[torch.nn.Module, Any, Any, Any, Any]`
- **`model`**
    - Comfy dtype: `MODEL`
    - The model component currently in use, either passed directly or derived from the bus.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP model component currently in use, either passed directly or derived from the bus.
    - Python dtype: `Any`
- **`vae`**
    - Comfy dtype: `VAE`
    - The VAE model component currently in use, either passed directly or derived from the bus.
    - Python dtype: `Any`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The positive conditioning component currently in use, either passed directly or derived from the bus.
    - Python dtype: `Any`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The negative conditioning component currently in use, either passed directly or derived from the bus.
    - Python dtype: `Any`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [DetailerForEach](../../ComfyUI-Impact-Pack/Nodes/DetailerForEach.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [Bus Node](../../was-node-suite-comfyui/Nodes/Bus Node.md)
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)



## Source code
```python
class WAS_Bus:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required":{},
            "optional": {
                "bus" : ("BUS",),
                "model": ("MODEL",),
                "clip": ("CLIP",),
                "vae": ("VAE",),
                "positive": ("CONDITIONING",),
                "negative": ("CONDITIONING",),
            }
        }
    RETURN_TYPES = ("BUS", "MODEL", "CLIP", "VAE", "CONDITIONING", "CONDITIONING",)
    RETURN_NAMES = ("bus", "model", "clip", "vae", "positive",     "negative")
    FUNCTION = "bus_fn"
    CATEGORY = "WAS Suite/Utilities"

    def bus_fn(self, bus=(None,None,None,None,None), model=None, clip=None, vae=None, positive=None, negative=None):

        # Unpack the 5 constituents of the bus from the bus tuple.
        (bus_model, bus_clip, bus_vae, bus_positive, bus_negative) = bus

        # If you pass in specific inputs, they override what comes from the bus.
        out_model       = model     or bus_model
        out_clip        = clip      or bus_clip
        out_vae         = vae       or bus_vae
        out_positive    = positive  or bus_positive
        out_negative    = negative  or bus_negative

        # Squash all 5 inputs into the output bus tuple.
        out_bus = (out_model, out_clip, out_vae, out_positive, out_negative)

        if not out_model:
            raise ValueError('Either model or bus containing a model should be supplied')
        if not out_clip:
            raise ValueError('Either clip or bus containing a clip should be supplied')
        if not out_vae:
            raise ValueError('Either vae or bus containing a vae should be supplied')
        # We don't insist that a bus contains conditioning.

        return (out_bus, out_model, out_clip, out_vae, out_positive, out_negative)

```
