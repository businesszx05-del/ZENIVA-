/**
 * Innovate - Premium Animation Experience
 * A cinematic 2D animation with 5 scenes
 * Uses CSS animations with JavaScript orchestration
 */

(function() {
    'use strict';

    // ===== WAIT FOR DOM TO BE READY =====
    function domReady(callback) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(callback, 1);
        } else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    }

    // ===== MAIN ANIMATION CONTROLLER =====
    function AnimationController() {
        // Scene elements
        this.scenes = document.querySelectorAll('.scene');
        this.scene1 = document.getElementById('scene1');
        this.scene2 = document.getElementById('scene2');
        this.scene3 = document.getElementById('scene3');
        this.scene4 = document.getElementById('scene4');
        this.scene5 = document.getElementById('scene5');

        // Scene 2 elements
        this.cards = document.querySelectorAll('.card');

        // Scene 3 elements
        this.centralNode = document.querySelector('.central-node');
        this.orbitNodes = document.querySelectorAll('.orbit-node');
        this.lines = document.querySelectorAll('.line');
        this.particles = document.querySelectorAll('.particle');

        // Scene 4 elements
        this.centralGlow = document.querySelector('.central-glow');
        this.centralObject = document.querySelector('.central-object');
        this.orbitingObjects = document.querySelectorAll('.orbiting-object');

        // Scene 5 elements
        this.finalContent = document.querySelector('.final-content');
        this.floatingParticles = document.querySelectorAll('.floating-particle');

        // Animation state
        this.isAnimating = false;
        this.animationFrameId = null;
        this.particleAnimations = [];

        // Timing configuration (in milliseconds)
        this.timing = {
            scene1Duration: 3000,
            scene2Duration: 5000,
            scene3Duration: 5000,
            scene4Duration: 5000,
            scene5Duration: 4000,
            totalDuration: 22000,
            transitionDelay: 500
        };

        // Initialize
        this.init();
    }

    // ===== INITIALIZATION =====
    AnimationController.prototype.init = function() {
        // Hide all scenes initially
        this.scenes.forEach(scene => {
            scene.classList.remove('active');
        });

        // Set up particle positions for scene 3
        this.setupParticlePositions();

        // Start the animation
        this.startAnimation();

        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            this.setupParticlePositions();
        }, 250));
    };

    // ===== SETUP PARTICLE POSITIONS =====
    AnimationController.prototype.setupParticlePositions = function() {
        // Position particles around the central node
        const positions = [
            { top: 25, left: 50 },
            { top: 50, right: 25 },
            { bottom: 25, left: 50 },
            { top: 50, left: 25 }
        ];

        this.particles.forEach((particle, index) => {
            if (positions[index]) {
                const pos = positions[index];
                particle.style.top = `${pos.top}%`;
                if (pos.left !== undefined) {
                    particle.style.left = `${pos.left}%`;
                    particle.style.right = 'auto';
                } else {
                    particle.style.right = `${pos.right}%`;
                    particle.style.left = 'auto';
                }
            }
        });
    };

    // ===== START ANIMATION =====
    AnimationController.prototype.startAnimation = function() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Reset all scenes and elements
        this.resetAll();

        // Scene 1: Intro (0-3s)
        this.activateScene(this.scene1);

        // Scene 2: Main Visual (3-8s)
        this.scheduleSceneTransition(
            this.scene1, this.scene2,
            this.timing.scene1Duration,
            () => this.activateScene2()
        );

        // Scene 3: Interaction (8-13s)
        this.scheduleSceneTransition(
            this.scene2, this.scene3,
            this.timing.scene1Duration + this.timing.scene2Duration,
            () => this.activateScene3()
        );

        // Scene 4: Transformation (13-18s)
        this.scheduleSceneTransition(
            this.scene3, this.scene4,
            this.timing.scene1Duration + this.timing.scene2Duration + this.timing.scene3Duration,
            () => this.activateScene4()
        );

        // Scene 5: Final (18-22s)
        this.scheduleSceneTransition(
            this.scene4, this.scene5,
            this.timing.scene1Duration + this.timing.scene2Duration + this.timing.scene3Duration + this.timing.scene4Duration,
            () => this.activateScene5()
        );

        // Loop animation
        this.scheduleSceneTransition(
            this.scene5, null,
            this.timing.totalDuration,
            () => this.startAnimation()
        );
    };

    // ===== ACTIVATE SCENE =====
    AnimationController.prototype.activateScene = function(scene) {
        this.scenes.forEach(s => s.classList.remove('active'));
        scene.classList.add('active');
    };

    // ===== SCHEDULE SCENE TRANSITION =====
    AnimationController.prototype.scheduleSceneTransition = function(fromScene, toScene, delay, callback) {
        setTimeout(() => {
            if (fromScene) fromScene.classList.remove('active');
            if (toScene) toScene.classList.add('active');
            if (callback) callback();
        }, delay);
    };

    // ===== ACTIVATE SCENE 2 =====
    AnimationController.prototype.activateScene2 = function() {
        const cardDelay = 400;
        this.cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('active');
            }, index * cardDelay);
        });
    };

    // ===== ACTIVATE SCENE 3 =====
    AnimationController.prototype.activateScene3 = function() {
        // Activate central node
        this.centralNode.classList.add('active');

        // Activate orbit nodes with delay
        const nodeDelay = 300;
        this.orbitNodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('active');
            }, index * nodeDelay);
        });

        // Activate lines after nodes
        setTimeout(() => {
            const lineDelay = 400;
            this.lines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('active');
                }, index * lineDelay);
            });
        }, 1000);

        // Activate particles after lines
        setTimeout(() => {
            this.particleAnimations = [];
            this.particles.forEach((particle, index) => {
                setTimeout(() => {
                    particle.classList.add('active');
                }, index * 200);
            });
        }, 1500);
    };

    // ===== ANIMATE PARTICLE (simplified) =====
    AnimationController.prototype.animateParticle = function(particle, index) {
        // Particles now use CSS animations, no JS animation needed
    };

    // ===== ACTIVATE SCENE 4 =====
    AnimationController.prototype.activateScene4 = function() {
        // Activate central glow
        this.centralGlow.classList.add('active');

        // Activate central object after glow starts
        setTimeout(() => {
            this.centralObject.classList.add('active');
        }, 500);

        // Activate orbiting objects with delay
        const objDelay = 300;
        this.orbitingObjects.forEach((obj, index) => {
            setTimeout(() => {
                obj.classList.add('active');
            }, 1000 + index * objDelay);
        });
    };

    // ===== ACTIVATE SCENE 5 =====
    AnimationController.prototype.activateScene5 = function() {
        // Activate final content
        this.finalContent.classList.add('active');

        // Activate floating particles
        this.floatingParticles.forEach((p, index) => {
            setTimeout(() => {
                p.style.opacity = '1';
            }, index * 200);
        });
    };

    // ===== RESET ALL ELEMENTS =====
    AnimationController.prototype.resetAll = function() {
        // Reset scenes
        this.scenes.forEach(scene => {
            scene.classList.remove('active');
        });

        // Reset scene 2
        this.cards.forEach(card => {
            card.classList.remove('active');
        });

        // Reset scene 3
        this.centralNode.classList.remove('active');
        this.orbitNodes.forEach(node => {
            node.classList.remove('active');
        });
        this.lines.forEach(line => {
            line.classList.remove('active');
        });
        this.particles.forEach(p => {
            p.classList.remove('active');
            p.style.transform = 'translate(-50%, -50%) scale(0)';
        });

        // Cancel particle animations
        this.particleAnimations.forEach(anim => {
            if (anim) cancelAnimationFrame(anim);
        });
        this.particleAnimations = [];

        // Reset scene 4
        this.centralGlow.classList.remove('active');
        this.centralObject.classList.remove('active');
        this.orbitingObjects.forEach(obj => {
            obj.classList.remove('active');
            obj.style.animation = 'none';
            setTimeout(() => {
                obj.style.animation = '';
            }, 10);
        });

        // Reset scene 5
        this.finalContent.classList.remove('active');
        this.floatingParticles.forEach(p => {
            p.style.opacity = '0';
        });
    };

    // ===== UTILITY: DEBOUNCE =====
    AnimationController.prototype.debounce = function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // ===== INITIALIZE WHEN DOM IS READY =====
    domReady(() => {
        // Check if all required elements exist
        if (document.getElementById('scene1') &&
            document.getElementById('scene2') &&
            document.getElementById('scene3') &&
            document.getElementById('scene4') &&
            document.getElementById('scene5')) {
            new AnimationController();
        } else {
            console.error('Required scene elements not found');
        }
    });

    // ===== HANDLE VISIBILITY CHANGE =====
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations when tab is not visible
            const controller = document.animationController;
            if (controller && controller.particleAnimations) {
                controller.particleAnimations.forEach(anim => {
                    if (anim) cancelAnimationFrame(anim);
                });
            }
        }
    });

    // ===== EXPOSE FOR DEBUGGING =====
    window.AnimationController = AnimationController;
})();

// ===== FALLBACK FOR OLDER BROWSERS =====
if (!('requestAnimationFrame' in window)) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 1000 / 60);
    };
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}
