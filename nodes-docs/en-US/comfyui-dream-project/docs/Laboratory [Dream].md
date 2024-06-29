---
tags:
- RandomGeneration
- Randomization
---

# 🧪 Laboratory
## Documentation
- Class name: `Laboratory [Dream]`
- Category: `✨ Dream/🛠 utils`
- Output node: `False`

The Laboratory node is designed to generate and manipulate numerical values based on a variety of modes such as random uniform, random bell, ladder, and random walk. It allows for dynamic value generation within specified ranges, making it a versatile tool for experiments and simulations in creative projects.
## Input types
### Required
- **`frame_counter`**
    - A counter tracking the current frame within a sequence, essential for determining when to renew the generated value based on the specified policy.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
- **`key`**
    - A unique identifier for the generated value, supporting default randomization to ensure uniqueness. It plays a crucial role in value tracking and retrieval across frames.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - Determines the starting point of the random number generation, enabling reproducible results. It's essential for consistency in simulations or when re-generating values.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`renew_policy`**
    - Defines the policy for renewing the generated value, affecting how often new values are produced based on frame changes or initial generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`min_value`**
    - Sets the lower bound for the generated value, crucial for defining the value range and ensuring outputs fall within expected limits.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max_value`**
    - Establishes the upper limit for the generated value, essential for controlling the range and precision of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mode`**
    - Specifies the method of value generation, influencing the distribution and variation of the output values.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`step_size`**
    - Determines the increment size between values in certain modes, impacting the granularity and smoothness of value transitions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The primary generated float value, serving as the versatile output for various applications.
    - Python dtype: `float`
- **`INT`**
    - Comfy dtype: `INT`
    - An integer representation of the primary generated value, offering a discrete alternative for specific needs.
    - Python dtype: `int`
- **`log_entry`**
    - Comfy dtype: `LOG_ENTRY`
    - A log entry detailing the generation or reuse of the value, providing insights and traceability for debugging and analysis.
    - Python dtype: `LogEntry.ID`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamLaboratory:
    NODE_NAME = "Laboratory"
    ICON = "🧪"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "key": ("STRING", {"default": "Random value " + str(random.randint(0, 1000000))}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "renew_policy": (["every frame", "first frame"],),
                "min_value": ("FLOAT", {"default": 0.0}),
                "max_value": ("FLOAT", {"default": 1.0}),
                "mode": (["random uniform", "random bell", "ladder", "random walk"],),
            },
            "optional": {
                "step_size": ("FLOAT", {"default": 0.1}),
            },
        }

    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = ("FLOAT", "INT", LogEntry.ID)
    RETURN_NAMES = ("FLOAT", "INT", "log_entry")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def _generate(self, seed, last_value, min_value, max_value, mode, step_size):
        rnd = random.Random()
        rnd.seed(seed)

        def jsonify(v: float):
            return json.loads(json.dumps(v))

        if mode == "random uniform":
            return jsonify(self._mode_uniform(rnd, last_value, min_value, max_value, step_size))
        elif mode == "random bell":
            return jsonify(self._mode_bell(rnd, last_value, min_value, max_value, step_size))
        elif mode == "ladder":
            return jsonify(self._mode_ladder(rnd, last_value, min_value, max_value, step_size))
        else:
            return jsonify(self._mode_walk(rnd, last_value, min_value, max_value, step_size))

    def _mode_uniform(self, rnd: random.Random, last_value: float, min_value: float, max_value: float, step_size):
        return rnd.random() * (max_value - min_value) + min_value

    def _mode_bell(self, rnd: random.Random, last_value: float, min_value: float, max_value: float, step_size):
        s = 0.0
        for i in range(3):
            s += rnd.random() * (max_value - min_value) + min_value
        return s / 3.0

    def _mode_ladder(self, rnd: random.Random, last_value: float, min_value: float, max_value: float, step_size):
        if last_value is None:
            last_value = min_value - step_size
        next_value = last_value + step_size
        if next_value > max_value:
            d = abs(max_value - min_value)
            next_value = (next_value - min_value) % d + min_value
        return next_value

    def _mode_walk(self, rnd: random.Random, last_value: float, min_value: float, max_value: float, step_size):
        if last_value is None:
            last_value = (max_value - min_value) * 0.5
        if rnd.random() >= 0.5:
            return min(max_value, last_value + step_size)
        else:
            return max(min_value, last_value - step_size)

    def result(self, key, frame_counter: FrameCounter, seed, renew_policy, min_value, max_value, mode, **values):
        if min_value > max_value:
            t = max_value
            max_value = min_value
            min_value = t
        step_size = values.get("step_size", abs(max_value - min_value) * 0.1)
        last_value = _laboratory_state.get_section("values").get(key, None)

        if (last_value is None) or (renew_policy == "every frame") or frame_counter.is_first_frame:
            v = _laboratory_state.get_section("values") \
                .update(key, 0, lambda old: self._generate(seed, last_value, min_value, max_value, mode, step_size))
            return v, round(v), LogEntry.new(
                "Laboratory generated new value for '{}': {} ({})".format(key, v, round(v)))
        else:
            return last_value, round(last_value), LogEntry.new("Laboratory reused value for '{}': {} ({})"
                                                               .format(key, last_value, round(last_value)))

```
