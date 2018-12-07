! function(f, d, m, n) {
    var a = "ontouchstart" in d,
        h = function() {
            var e = m.createElement("div"),
                t = m.documentElement;
            if (!("pointerEvents" in e.style)) return !1;
            e.style.pointerEvents = "auto", e.style.pointerEvents = "x", t.appendChild(e);
            var n = d.getComputedStyle && "auto" === d.getComputedStyle(e, "").pointerEvents;
            return t.removeChild(e), !!n
        }(),
        r = a ? "touchstart" : "mousedown",
        s = a ? "touchmove" : "mousemove",
        l = a ? "touchend" : "mouseup",
        u = a ? "touchcancel" : "mouseup",
        o = {
            contentCallback: function(e) {
                return e.content ? e.content : e.id
            },
            listNodeName: "ol",
            itemNodeName: "li",
            handleNodeName: "div",
            contentNodeName: "span",
            rootClass: "dd",
            listClass: "dd-list",
            itemClass: "dd-item",
            dragClass: "dd-dragel",
            handleClass: "dd-handle",
            contentClass: "dd-content",
            collapsedClass: "dd-collapsed",
            placeClass: "dd-placeholder",
            noDragClass: "dd-nodrag",
            noChildrenClass: "dd-nochildren",
            emptyClass: "dd-empty",
            expandBtnHTML: '<button class="dd-expand" data-action="expand" type="button">Expand</button>',
            collapseBtnHTML: '<button class="dd-collapse" data-action="collapse" type="button">Collapse</button>',
            group: 0,
            maxDepth: 5,
            threshold: 20,
            fixedDepth: !1,
            fixed: !1,
            includeContent: !1,
            callback: function(e, t) {},
            onDragStart: function(e, t) {},
            listRenderer: function(e, t) {
                var n = "<" + t.listNodeName + ' class="' + t.listClass + '">';
                return n += e, n += "</" + t.listNodeName + ">"
            },
            itemRenderer: function(e, t, n, r, o) {
                var i = f.map(e, function(e, t) {
                        return " " + t + '="' + e + '"'
                    }).join(" "),
                    a = "<" + r.itemNodeName + i + ">";
                return a += "<" + r.handleNodeName + ' class="' + r.handleClass + '">', a += "<" + r.contentNodeName + ' class="' + r.contentClass + '">', a += t, a += "</" + r.contentNodeName + ">", a += "</" + r.handleNodeName + ">", a += n, a += "</" + r.itemNodeName + ">"
            }
        };

    function c(e, t) {
        this.w = f(m), this.el = f(e), t || (t = o), t.rootClass !== n && "dd" !== t.rootClass && (t.listClass = t.listClass ? t.listClass : t.rootClass + "-list", t.itemClass = t.itemClass ? t.itemClass : t.rootClass + "-item", t.dragClass = t.dragClass ? t.dragClass : t.rootClass + "-dragel", t.handleClass = t.handleClass ? t.handleClass : t.rootClass + "-handle", t.collapsedClass = t.collapsedClass ? t.collapsedClass : t.rootClass + "-collapsed", t.placeClass = t.placeClass ? t.placeClass : t.rootClass + "-placeholder", t.noDragClass = t.noDragClass ? t.noDragClass : t.rootClass + "-nodrag", t.noChildrenClass = t.noChildrenClass ? t.noChildrenClass : t.rootClass + "-nochildren", t.emptyClass = t.emptyClass ? t.emptyClass : t.rootClass + "-empty"), this.options = f.extend({}, o, t), this.options.json !== n && this._build(), this.init()
    }
    c.prototype = {
        init: function() {
            var o = this;
            o.reset(), o.el.data("nestable-group", this.options.group), o.placeEl = f('<div class="' + o.options.placeClass + '"/>'), f.each(this.el.find(o.options.itemNodeName), function(e, t) {
                var n = f(t),
                    r = n.parent();
                o.setParent(n), r.hasClass(o.options.collapsedClass) && o.collapseItem(r.parent())
            }), o.el.on("click", "button", function(e) {
                if (!o.dragEl && (a || 0 === e.button)) {
                    var t = f(e.currentTarget),
                        n = t.data("action"),
                        r = t.parent(o.options.itemNodeName);
                    "collapse" === n && o.collapseItem(r), "expand" === n && o.expandItem(r)
                }
            });
            var e = function(e) {
                    var t = f(e.target);
                    if (!t.hasClass(o.options.handleClass)) {
                        if (t.closest("." + o.options.noDragClass).length) return;
                        t = t.closest("." + o.options.handleClass)
                    }!t.length || o.dragEl || !a && 1 !== e.which || a && 1 !== e.touches.length || (e.preventDefault(), o.dragStart(a ? e.touches[0] : e))
                },
                t = function(e) {
                    o.dragEl && (e.preventDefault(), o.dragMove(a ? e.touches[0] : e))
                },
                n = function(e) {
                    o.dragEl && (e.preventDefault(), o.dragStop(a ? e.touches[0] : e))
                };
            a ? (o.el[0].addEventListener(r, e, !1), d.addEventListener(s, t, !1), d.addEventListener(l, n, !1), d.addEventListener(u, n, !1)) : (o.el.on(r, e), o.w.on(s, t), o.w.on(l, n));
            o.el.bind("destroy-nestable", function() {
                a ? (o.el[0].removeEventListener(r, e, !1), d.removeEventListener(s, t, !1), d.removeEventListener(l, n, !1), d.removeEventListener(u, n, !1)) : (o.el.off(r, e), o.w.off(s, t), o.w.off(l, n)), o.el.off("click"), o.el.unbind("destroy-nestable"), o.el.data("nestable", null)
            })
        },
        destroy: function() {
            this.el.trigger("destroy-nestable")
        },
        _build: function() {
            function i(e, n) {
                if (!e) return "";
                var r = "";
                return f.each(e, function(e, t) {
                    r += function(e, t) {
                        var n = function(e) {
                            delete(e = f.extend({}, e)).children, delete e.classes, delete e.content;
                            var r = {};
                            return f.each(e, function(e, t) {
                                var n;
                                "object" == typeof t && (t = JSON.stringify(t)), r["data-" + e] = (n = {
                                    "&": "&amp;",
                                    "<": "&lt;",
                                    ">": "&gt;",
                                    '"': "&quot;",
                                    "'": "&#039;"
                                }, t + "".replace(/[&<>"']/g, function(e) {
                                    return n[e]
                                }))
                            }), r
                        }(e);
                        n.class = function(e, t) {
                            var n = e.classes || {};
                            "string" == typeof n && (n = [n]);
                            var r = function(e) {
                                var t = {};
                                for (var n in e) t[e[n]] = e[n];
                                return t
                            }(n);
                            return r[t.itemClass] = t.itemClass, f.map(r, function(e) {
                                return e
                            }).join(" ")
                        }(e, t);
                        var r = t.contentCallback(e),
                            o = i(e.children, t);
                        return t.itemRenderer(n, r, o, t, e)
                    }(t, n)
                }), n.listRenderer(r, n)
            }
            var e = this.options.json;
            "string" == typeof e && (e = JSON.parse(e)), f(this.el).html(i(e, this.options))
        },
        serialize: function() {
            var i = this,
                a = function(e) {
                    var o = [];
                    return e.children(i.options.itemNodeName).each(function() {
                        var e = f(this),
                            t = f.extend({}, e.data()),
                            n = e.children(i.options.listNodeName);
                        if (i.options.includeContent) {
                            var r = e.find("." + i.options.contentClass).html();
                            r && (t.content = r)
                        }
                        n.length && (t.children = a(n)), o.push(t)
                    }), o
                };
            return a(i.el.find(i.options.listNodeName).first())
        },
        asNestedSet: function() {
            var s = this.options,
                l = [],
                e = 1;
            return this.el.find(s.listNodeName).first().children(s.itemNodeName).each(function() {
                e = function e(t, n, r) {
                    var o, i, a = r + 1;
                    0 < f(t).children(s.listNodeName).children(s.itemNodeName).length && (n++, f(t).children(s.listNodeName).children(s.itemNodeName).each(function() {
                        a = e(f(this), n, a)
                    }), n--);
                    o = parseInt(f(t).attr("data-id"));
                    i = parseInt(f(t).parent(s.listNodeName).parent(s.itemNodeName).attr("data-id")) || "";
                    o && l.push({
                        id: o,
                        parent_id: i,
                        depth: n,
                        lft: r,
                        rgt: a
                    });
                    r = a + 1;
                    return r
                }(this, 0, e)
            }), l = l.sort(function(e, t) {
                return e.lft - t.lft
            })
        },
        returnOptions: function() {
            return this.options
        },
        serialise: function() {
            return this.serialize()
        },
        reset: function() {
            this.mouse = {
                offsetX: 0,
                offsetY: 0,
                startX: 0,
                startY: 0,
                lastX: 0,
                lastY: 0,
                nowX: 0,
                nowY: 0,
                distX: 0,
                distY: 0,
                dirAx: 0,
                dirX: 0,
                dirY: 0,
                lastDirX: 0,
                lastDirY: 0,
                distAxX: 0,
                distAxY: 0
            }, this.moving = !1, this.dragEl = null, this.dragRootEl = null, this.dragDepth = 0, this.hasNewRoot = !1, this.pointEl = null
        },
        expandItem: function(e) {
            e.removeClass(this.options.collapsedClass)
        },
        collapseItem: function(e) {
            e.children(this.options.listNodeName).length && e.addClass(this.options.collapsedClass)
        },
        expandAll: function() {
            var e = this;
            e.el.find(e.options.itemNodeName).each(function() {
                e.expandItem(f(this))
            })
        },
        collapseAll: function() {
            var e = this;
            e.el.find(e.options.itemNodeName).each(function() {
                e.collapseItem(f(this))
            })
        },
        setParent: function(e) {
            e.children(this.options.listNodeName).length && (e.children("[data-action]").remove(), e.prepend(f(this.options.expandBtnHTML)), e.prepend(f(this.options.collapseBtnHTML)))
        },
        unsetParent: function(e) {
            e.removeClass(this.options.collapsedClass), e.children("[data-action]").remove(), e.children(this.options.listNodeName).remove()
        },
        dragStart: function(e) {
            var t = this.mouse,
                n = f(e.target).closest(this.options.itemNodeName);
            this.options.onDragStart.call(this, this.el, n), this.placeEl.css("height", n.height()), t.offsetX = e.pageX - n.offset().left, t.offsetY = e.pageY - n.offset().top, t.startX = t.lastX = e.pageX, t.startY = t.lastY = e.pageY, this.dragRootEl = this.el, this.dragEl = f(m.createElement(this.options.listNodeName)).addClass(this.options.listClass + " " + this.options.dragClass), this.dragEl.css("width", n.outerWidth()), this.setIndexOfItem(n), n.after(this.placeEl), n[0].parentNode.removeChild(n[0]), n.appendTo(this.dragEl), f(m.body).append(this.dragEl), this.dragEl.css({
                left: e.pageX - t.offsetX,
                top: e.pageY - t.offsetY
            });
            var r, o, i = this.dragEl.find(this.options.itemNodeName);
            for (r = 0; r < i.length; r++)(o = f(i[r]).parents(this.options.listNodeName).length) > this.dragDepth && (this.dragDepth = o)
        },
        setIndexOfItem: function(e, t) {
            void 0 === t && (t = []), t.unshift(e.index()), f(e[0].parentNode)[0] !== this.dragRootEl[0] ? this.setIndexOfItem(f(e[0].parentNode), t) : this.dragEl.data("indexOfItem", t)
        },
        restoreItemAtIndex: function(e) {
            var n = this.dragEl.data("indexOfItem"),
                t = this.el;
            for (i = 0; i < n.length; i++) {
                if (n.length - 1 === parseInt(i)) return void r(t, e);
                t = t[0].children[n[i]]
            }

            function r(e, t) {
                0 === n[n.length - 1] ? f(e).prepend(t.clone()) : f(e.children[n[n.length - 1] - 1]).after(t.clone())
            }
        },
        dragStop: function(e) {
            var t = this.dragEl.children(this.options.itemNodeName).first();
            t[0].parentNode.removeChild(t[0]), this.placeEl.replaceWith(t), this.hasNewRoot ? (!0 === this.options.fixed ? this.restoreItemAtIndex(t) : this.el.trigger("lostItem"), this.dragRootEl.trigger("gainedItem")) : this.dragRootEl.trigger("change"), this.dragEl.remove(), this.options.callback.call(this, this.dragRootEl, t), this.reset()
        },
        dragMove: function(e) {
            var t, n, r, o = this.options,
                i = this.mouse;
            this.dragEl.css({
                left: e.pageX - i.offsetX,
                top: e.pageY - i.offsetY
            }), i.lastX = i.nowX, i.lastY = i.nowY, i.nowX = e.pageX, i.nowY = e.pageY, i.distX = i.nowX - i.lastX, i.distY = i.nowY - i.lastY, i.lastDirX = i.dirX, i.lastDirY = i.dirY, i.dirX = 0 === i.distX ? 0 : 0 < i.distX ? 1 : -1, i.dirY = 0 === i.distY ? 0 : 0 < i.distY ? 1 : -1;
            var a = Math.abs(i.distX) > Math.abs(i.distY) ? 1 : 0;
            if (!i.moving) return i.dirAx = a, void(i.moving = !0);
            i.dirAx !== a ? (i.distAxX = 0, i.distAxY = 0) : (i.distAxX += Math.abs(i.distX), 0 !== i.dirX && i.dirX !== i.lastDirX && (i.distAxX = 0), i.distAxY += Math.abs(i.distY), 0 !== i.dirY && i.dirY !== i.lastDirY && (i.distAxY = 0)), i.dirAx = a, i.dirAx && i.distAxX >= o.threshold && (i.distAxX = 0, r = this.placeEl.prev(o.itemNodeName), 0 < i.distX && r.length && !r.hasClass(o.collapsedClass) && !r.hasClass(o.noChildrenClass) && (t = r.find(o.listNodeName).last(), this.placeEl.parents(o.listNodeName).length + this.dragDepth <= o.maxDepth && (t.length ? (t = r.children(o.listNodeName).last()).append(this.placeEl) : ((t = f("<" + o.listNodeName + "/>").addClass(o.listClass)).append(this.placeEl), r.append(t), this.setParent(r)))), i.distX < 0 && (this.placeEl.next(o.itemNodeName).length || (n = this.placeEl.parent(), this.placeEl.closest(o.itemNodeName).after(this.placeEl), n.children().length || this.unsetParent(n.parent()))));
            var s = !1;
            if (h || (this.dragEl[0].style.visibility = "hidden"), this.pointEl = f(m.elementFromPoint(e.pageX - m.body.scrollLeft, e.pageY - (d.pageYOffset || m.documentElement.scrollTop))), h || (this.dragEl[0].style.visibility = "visible"), this.pointEl.hasClass(o.handleClass) && (this.pointEl = this.pointEl.closest(o.itemNodeName)), this.pointEl.hasClass(o.emptyClass)) s = !0;
            else if (!this.pointEl.length || !this.pointEl.hasClass(o.itemClass)) return;
            var l = this.pointEl.closest("." + o.rootClass),
                u = this.dragRootEl.data("nestable-id") !== l.data("nestable-id");
            if (!i.dirAx || u || s) {
                if (u && o.group !== l.data("nestable-group")) return;
                if (this.options.fixedDepth && this.dragDepth + 1 !== this.pointEl.parents(o.listNodeName).length) return;
                if (this.dragDepth - 1 + this.pointEl.parents(o.listNodeName).length > o.maxDepth) return;
                var c = e.pageY < this.pointEl.offset().top + this.pointEl.height() / 2;
                n = this.placeEl.parent(), s ? ((t = f(m.createElement(o.listNodeName)).addClass(o.listClass)).append(this.placeEl), this.pointEl.replaceWith(t)) : c ? this.pointEl.before(this.placeEl) : this.pointEl.after(this.placeEl), n.children().length || this.unsetParent(n.parent()), this.dragRootEl.find(o.itemNodeName).length || this.dragRootEl.append('<div class="' + o.emptyClass + '"/>'), this.dragRootEl = l, u && (this.hasNewRoot = this.el[0] !== this.dragRootEl[0])
            }
        }
    }, f.fn.nestable = function(t) {
        var n = this;
        return "Nestable" in d || (d.Nestable = {}, Nestable.counter = 0), this.each(function() {
            var e = f(this).data("nestable");
            e ? "string" == typeof t && "function" == typeof e[t] && (n = e[t]()) : (Nestable.counter++, f(this).data("nestable", new c(this, t)), f(this).data("nestable-id", Nestable.counter))
        }), n || this
    }
}(window.jQuery || window.Zepto, window, document);