
# Documentation
- Class name: `Laboratory [Dream]`
- Category: `✨ Dream/🛠 utils`
- Output node: `False`
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Laboratory [Dream] 节点专门设计用于基于多种模式（如均匀随机、钟形随机、阶梯和随机游走）生成和操作数值。它允许在指定范围内动态生成值，使其成为创意项目中实验和模拟的多功能工具。

# Input types
## Required
- frame_counter
    - 跟踪序列中当前帧的计数器，对于根据指定策略确定何时更新生成值至关重要。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- key
    - 生成值的唯一标识符，支持默认随机化以确保唯一性。它在跨帧值跟踪和检索中发挥关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - 决定随机数生成的起点，实现可重复的结果。对于模拟的一致性或重新生成值时至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- renew_policy
    - 定义更新生成值的策略，影响基于帧变化或初始生成产生新值的频率。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- min_value
    - 设置生成值的下限，对定义值范围和确保输出在预期限制内至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_value
    - 确立生成值的上限，对控制输出的范围和精度至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mode
    - 指定值生成的方法，影响输出值的分布和变化。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- step_size
    - 决定某些模式下值之间的增量大小，影响值转换的粒度和平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- FLOAT
    - 主要生成的浮点值，作为各种应用的多功能输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- INT
    - 主要生成值的整数表示，为特定需求提供离散选择。
    - Comfy dtype: INT
    - Python dtype: int
- log_entry
    - 详细记录值的生成或重用的日志条目，为调试和分析提供洞察力和可追溯性。
    - Comfy dtype: LOG_ENTRY
    - Python dtype: LogEntry.ID


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
