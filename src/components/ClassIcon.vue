<template>
    <div
        class="ClassIcon"
        :class="[iconSize, iconType, iconClass]"
        :data-value="iconLabel"
    >
        <div class="ClassIcon-icon"></div>
        <div class="ClassIcon-tooltip">{{ iconLabel }}</div>
    </div>
</template>

<script>
export default {
    name: "ClassIcon",
    props: {
        classid: {
            type: Number,
            required: true,
        },
        size: {
            type: String,
            default: "medium",
        },
        rounded: {
            type: Boolean,
            default: false,
        },
    },
    data: function () {
        return {
            classData: {
                1: {
                    name: "warrior",
                    label: "Guerrero",
                },
                2: {
                    name: "paladin",
                    label: "Paladin",
                },
                3: {
                    name: "hunter",
                    label: "Cazador",
                },
                4: {
                    name: "rogue",
                    label: "Pícaro",
                },
                5: {
                    name: "priest",
                    label: "Sacerdote",
                },
                6: {
                    name: "death-knight",
                    label: "Caballero de la Muerte",
                },
                7: {
                    name: "shaman",
                    label: "Chamán",
                },
                8: {
                    name: "mage",
                    label: "Mago",
                },
                9: {
                    name: "warlock",
                    label: "Brujo",
                },
                10: {
                    name: "monk",
                    label: "Monje",
                },
                11: {
                    name: "druid",
                    label: "Druida",
                },
                12: {
                    name: "demon-hunter",
                    label: "Cazador de Demonios",
                },
            },
        };
    },
    mounted() {
        var tooltip = document.querySelectorAll('.ClassIcon-tooltip');

        document.addEventListener('mousemove', fn, false);

        function fn(e) {
            for (var i=tooltip.length; i--;) {
                tooltip[i].style.left = e.layerX + 'px';
                tooltip[i].style.top = e.layerY + 'px';
            }
        }
    },
    computed: {
        iconSize() {
            return "ClassIcon--" + this.size;
        },
        iconType() {
            return this.rounded ? "ClassIcon--rounded" : "";
        },
        iconClass() {
            return "ClassIcon--" + this.classData[this.classid].name;
        },
        iconLabel() {
            return this.classData[this.classid].label;
        },
    },
};



</script>

<style lang="scss" scoped>
.ClassIcon {
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #000;
    display: inline-block;
    max-width: 168px;
    width: 48px;
    border: 1px solid #504137;
    -webkit-box-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);

    &:before {
        content: "";
        display: block;
        padding-top: 100%;
    }

    // Sizes
    &--huge {
        width: 64px;
    }
    &--large {
        width: 56px;
    }
    &--medium {
        width: 32px;
    }
    &--small {
        width: 24px;
    }
    &--tiny {
        width: 16px;
    }
    &--full {
        width: 100%;
    }

    //Styles
    &--rounded {
        border-radius: 50%;
        overflow: hidden;
    }

    .ClassIcon-icon {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #000;
        background-size: cover;
        border-radius: 9%;
    }

    .ClassIcon-tooltip {
        //display: none;
        background: #211510;
        color: #FFFFFF;
        margin-left: 28px;
        padding: 10px;
        position: absolute;
        z-index: 1000;
        border-radius: 9%;
    }

    &:hover {
        .ClassIcon-tooltip {
            display: block;
        }
    }

    // Classes Images
    &--warrior {
        .ClassIcon-icon {
            background-image: url(~assets/classes/GameIcon/GameIcon-class-warrior.jpg);
        }
    }
    &--paladin {
        .ClassIcon-icon {
            background-image: url(~assets/classes/GameIcon/GameIcon-class-paladin.jpg);
        }
    }
    &--hunter {
        .ClassIcon-icon {
            background-image: url(~assets/classes/GameIcon/GameIcon-class-hunter.jpg);
        }
    }
    &--rogue {
        .ClassIcon-icon {
            background-image: url(~assets/classes/GameIcon/GameIcon-class-rogue.jpg);
        }
    }
    &--priest {
        .ClassIcon-icon {
            background-image: url(~assets/classes/GameIcon/GameIcon-class-priest.jpg);
        }
    }
    &--death-knight {
        .ClassIcon-icon {
            background-image: url(~assets/classes/GameIcon/GameIcon-class-death-knight.jpg);
        }
    }
    &--shaman {
        .ClassIcon-icon {
            background-image: url(~assets/classes/GameIcon/GameIcon-class-shaman.jpg);
        }
    }
    &--mage {
        .ClassIcon-icon {
            background-image: url(~assets/classes/GameIcon/GameIcon-class-mage.jpg);
        }
    }
    &--warlock {
        .ClassIcon-icon {
            background-image: url(~assets/classes/GameIcon/GameIcon-class-warlock.jpg);
        }
    }
    &--monk {
        .ClassIcon-icon {
            background-image: url(~assets/classes/GameIcon/GameIcon-class-monk.jpg);
        }
    }
    &--druid {
        .ClassIcon-icon {
            background-image: url(~assets/classes/GameIcon/GameIcon-class-druid.jpg);
        }
    }
    &--demon-hunter {
        .ClassIcon-icon {
            background-image: url(~assets/classes/GameIcon/GameIcon-class-demon-hunter.jpg);
        }
    }
}
</style>
