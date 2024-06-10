---
tags:
- VectorMath
---

# ComposeVec3
## Documentation
- Class name: `CM_ComposeVec3`
- Category: `math/conversion`
- Output node: `False`

The `CM_ComposeVec3` node is designed for creating a 3-dimensional vector (Vec3) from individual float values for each of its dimensions (x, y, z). This node facilitates the conversion of separate scalar values into a structured vector format, making it essential for mathematical operations and transformations that require vector inputs.
## Input types
### Required
- **`x`**
    - The 'x' parameter represents the x-coordinate of the Vec3. It is crucial for defining the vector's position along the x-axis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y`**
    - The 'y' parameter represents the y-coordinate of the Vec3. It plays a key role in specifying the vector's position along the y-axis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`z`**
    - The 'z' parameter signifies the z-coordinate of the Vec3. It is essential for determining the vector's position along the z-axis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`vec3`**
    - Comfy dtype: `VEC3`
    - The output is a 3-dimensional vector (Vec3) composed of the input float values for x, y, and z. This vector can be used for further mathematical or graphical operations.
    - Python dtype: `tuple[Vec3]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ComposeVec3:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "x": ("FLOAT", {"default": 0.0}),
                "y": ("FLOAT", {"default": 0.0}),
                "z": ("FLOAT", {"default": 0.0}),
            }
        }

    RETURN_TYPES = ("VEC3",)
    FUNCTION = "op"
    CATEGORY = "math/conversion"

    def op(self, x: float, y: float, z: float) -> tuple[Vec3]:
        return ((x, y, z),)

```
