# Number Counter
## Documentation
- Class name: `Number Counter`
- Category: `WAS Suite/Number`
- Output node: `False`

The node is designed to perform various numerical operations such as incrementing, decrementing, and adjusting numbers within specified ranges, based on a unique identifier and mode of operation. It abstracts the complexity of numerical manipulations, providing a flexible tool for numerical adjustments in sequences or cycles.
## Input types
### Required
- **`number_type`**
    - Specifies the type of number to be manipulated, either as an integer or a float, affecting the precision and nature of the operation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`mode`**
    - Determines the operation to be performed on the number, such as incrementing, decrementing, or adjusting to a stop value, defining the behavior of the numerical adjustment.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start`**
    - The starting value for the operation, serving as the base number from which adjustments are made.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Union[int, float]`
- **`stop`**
    - The target value for operations that adjust to a stop, setting a limit for the adjustment.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Union[int, float]`
- **`step`**
    - The increment or decrement step size, dictating the magnitude of each adjustment.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Union[int, float]`
### Optional
- **`reset_bool`**
    - A flag to reset the counter to the start value, enabling reinitialization of the operation.
    - Comfy dtype: `NUMBER`
    - Python dtype: `int`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The resulting number after the operation, reflecting the adjustment made.
    - Python dtype: `int`
- **`float`**
    - Comfy dtype: `FLOAT`
    - The resulting number in float format after the operation.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The resulting number in integer format after the operation.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Load Image Batch](../../was-node-suite-comfyui/Nodes/Load Image Batch.md)



## Source code
```python
class WAS_Number_Counter:
    def __init__(self):
        self.counters = {}

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "number_type": (["integer", "float"],),
                "mode": (["increment", "decrement", "increment_to_stop", "decrement_to_stop"],),
                "start": ("FLOAT", {"default": 0, "min": -18446744073709551615, "max": 18446744073709551615, "step": 0.01}),
                "stop": ("FLOAT", {"default": 0, "min": -18446744073709551615, "max": 18446744073709551615, "step": 0.01}),
                "step": ("FLOAT", {"default": 1, "min": 0, "max": 99999, "step": 0.01}),
            },
            "optional": {
                "reset_bool": ("NUMBER",),
            },
            "hidden": {
                "unique_id": "UNIQUE_ID",
            }
        }

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

    RETURN_TYPES = ("NUMBER", "FLOAT", "INT")
    RETURN_NAMES = ("number", "float", "int")
    FUNCTION = "increment_number"

    CATEGORY = "WAS Suite/Number"

    def increment_number(self, number_type, mode, start, stop, step, unique_id, reset_bool=0):

        counter = int(start) if mode == 'integer' else start
        if self.counters.__contains__(unique_id):
            counter = self.counters[unique_id]

        if round(reset_bool) >= 1:
            counter = start

        if mode == 'increment':
            counter += step
        elif mode == 'deccrement':
            counter -= step
        elif mode == 'increment_to_stop':
            counter = counter + step if counter < stop else counter
        elif mode == 'decrement_to_stop':
            counter = counter - step if counter > stop else counter

        self.counters[unique_id] = counter

        result = int(counter) if number_type == 'integer' else float(counter)

        return ( result, float(counter), int(counter) )

```
